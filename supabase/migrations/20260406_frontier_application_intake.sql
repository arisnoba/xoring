create extension if not exists pgcrypto with schema extensions;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'frontier_payment_token'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.frontier_payment_token as enum ('usdt', 'aios');
  end if;

  if not exists (
    select 1
    from pg_type
    where typname = 'frontier_application_status'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.frontier_application_status as enum (
      'submitted',
      'awaiting_payment',
      'payment_confirmed',
      'approved',
      'rejected'
    );
  end if;
end $$;

create or replace function public.set_frontier_application_timestamps()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, timezone('utc', now()));
    new.updated_at := coalesce(new.updated_at, timezone('utc', now()));
    new.submitted_at := coalesce(new.submitted_at, timezone('utc', now()));
    new.consented_at := coalesce(new.consented_at, timezone('utc', now()));
    new.status_changed_at := coalesce(new.status_changed_at, timezone('utc', now()));
    return new;
  end if;

  new.updated_at := timezone('utc', now());

  if new.status is distinct from old.status then
    new.status_changed_at := timezone('utc', now());

    if new.status = 'payment_confirmed' and new.payment_confirmed_at is null then
      new.payment_confirmed_at := timezone('utc', now());
    end if;

    if new.status in ('approved', 'rejected') and new.reviewed_at is null then
      new.reviewed_at := timezone('utc', now());
    end if;
  end if;

  return new;
end;
$$;

create table if not exists public.frontier_applications (
  id uuid primary key default extensions.gen_random_uuid(),
  email text not null,
  wallet_address text not null,
  payment_token public.frontier_payment_token not null,
  status public.frontier_application_status not null default 'submitted',
  terms_version text not null,
  privacy_version text not null,
  consented_at timestamptz not null default timezone('utc', now()),
  submitted_at timestamptz not null default timezone('utc', now()),
  status_changed_at timestamptz not null default timezone('utc', now()),
  payment_confirmed_at timestamptz,
  reviewed_at timestamptz,
  status_note text,
  source text not null default 'landing_page',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint frontier_applications_email_not_blank
    check (length(btrim(email)) > 0),
  constraint frontier_applications_wallet_address_not_blank
    check (length(btrim(wallet_address)) > 0),
  constraint frontier_applications_terms_version_not_blank
    check (length(btrim(terms_version)) > 0),
  constraint frontier_applications_privacy_version_not_blank
    check (length(btrim(privacy_version)) > 0),
  constraint frontier_applications_source_not_blank
    check (length(btrim(source)) > 0),
  constraint frontier_applications_status_note_length
    check (char_length(coalesce(status_note, '')) <= 2000)
);

comment on table public.frontier_applications is
  'Frontier Edition 신청 접수 정보를 저장한다. 공개 폼은 Edge Function을 통해서만 insert 해야 한다.';

comment on column public.frontier_applications.terms_version is
  '사용자가 동의한 Terms of Service 버전. 현재 페이지 기준 2026-03-12.';

comment on column public.frontier_applications.privacy_version is
  '사용자가 동의한 Privacy Policy 버전. 현재 페이지 기준 2026-03-12.';

create unique index if not exists frontier_applications_email_unique_idx
  on public.frontier_applications (lower(btrim(email)));

create unique index if not exists frontier_applications_wallet_address_unique_idx
  on public.frontier_applications (lower(btrim(wallet_address)));

create index if not exists frontier_applications_status_submitted_at_idx
  on public.frontier_applications (status, submitted_at desc);

create index if not exists frontier_applications_submitted_at_idx
  on public.frontier_applications (submitted_at desc);

drop trigger if exists set_frontier_application_timestamps on public.frontier_applications;

create trigger set_frontier_application_timestamps
before insert or update on public.frontier_applications
for each row
execute function public.set_frontier_application_timestamps();

alter table public.frontier_applications enable row level security;

revoke all on public.frontier_applications from anon, authenticated;

