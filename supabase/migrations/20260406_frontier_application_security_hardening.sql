create or replace function public.set_frontier_application_timestamps()
returns trigger
language plpgsql
set search_path = public, pg_temp
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

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'No direct client select frontier applications'
  ) then
    create policy "No direct client select frontier applications"
      on public.frontier_applications
      for select
      to anon, authenticated
      using (false);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'No direct client insert frontier applications'
  ) then
    create policy "No direct client insert frontier applications"
      on public.frontier_applications
      for insert
      to anon, authenticated
      with check (false);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'No direct client update frontier applications'
  ) then
    create policy "No direct client update frontier applications"
      on public.frontier_applications
      for update
      to anon, authenticated
      using (false)
      with check (false);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'frontier_applications'
      and policyname = 'No direct client delete frontier applications'
  ) then
    create policy "No direct client delete frontier applications"
      on public.frontier_applications
      for delete
      to anon, authenticated
      using (false);
  end if;
end $$;
