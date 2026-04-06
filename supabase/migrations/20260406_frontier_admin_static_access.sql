create table if not exists public.admin_users (
  email text primary key,
  full_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint admin_users_email_not_blank
    check (length(btrim(email)) > 0)
);

create or replace function public.set_admin_user_timestamps()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, timezone('utc', now()));
  end if;

  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_admin_user_timestamps on public.admin_users;

create trigger set_admin_user_timestamps
before insert or update on public.admin_users
for each row
execute function public.set_admin_user_timestamps();

alter table public.admin_users enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_users'
      and policyname = 'Authenticated admins can read their own allowlist row'
  ) then
    create policy "Authenticated admins can read their own allowlist row"
      on public.admin_users
      for select
      to authenticated
      using (
        is_active
        and lower(btrim(email)) = lower(coalesce(auth.jwt()->>'email', ''))
      );
  end if;
end $$;

grant select on public.frontier_applications to authenticated;
grant update (status, status_note) on public.frontier_applications to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'Authenticated admins can select frontier applications'
  ) then
    create policy "Authenticated admins can select frontier applications"
      on public.frontier_applications
      for select
      to authenticated
      using (
        exists (
          select 1
          from public.admin_users
          where is_active
            and lower(btrim(email)) = lower(coalesce(auth.jwt()->>'email', ''))
        )
      );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'Authenticated admins can update review fields'
  ) then
    create policy "Authenticated admins can update review fields"
      on public.frontier_applications
      for update
      to authenticated
      using (
        exists (
          select 1
          from public.admin_users
          where is_active
            and lower(btrim(email)) = lower(coalesce(auth.jwt()->>'email', ''))
        )
      )
      with check (
        exists (
          select 1
          from public.admin_users
          where is_active
            and lower(btrim(email)) = lower(coalesce(auth.jwt()->>'email', ''))
        )
      );
  end if;
end $$;

