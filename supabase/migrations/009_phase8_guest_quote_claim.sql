-- Phase 8: secure guest quote association on account creation/login

alter table public.quote_requests
  add column if not exists guest_claim_token uuid;

create index if not exists idx_quote_requests_guest_claim
  on public.quote_requests (guest_claim_token)
  where guest_claim_token is not null and user_id is null;

comment on column public.quote_requests.guest_claim_token is
  'HttpOnly cookie bh_quote_claim must match to attach quote to user_id on login; never accept arbitrary quote IDs from client';
