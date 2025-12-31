-- Migration: create comprehensive applications table
-- This table captures each form field as a separate column plus a JSONB `data` column
-- Run this SQL in your Supabase project's SQL editor or via psql

create table if not exists public.applications (
  id bigserial primary key,
  application_id text unique,

  -- Personal info
  applicant_type text,
  university_email text,
  first_name text,
  middle_name text,
  last_name text,
  date_of_birth date,
  gender text,
  email text,
  phone text,
  street_address text,
  apartment_number text,
  city text,
  state text,
  zip_code text,
  citizenship_status text,
  ssn text,
  country_of_citizenship text,
  ethnicity text,
  first_generation boolean,
  emergency_contact_name text,
  emergency_contact_relationship text,
  emergency_contact_phone text,
  emergency_contact_email text,

  -- Academic
  academic_level text,
  intended_major text,
  enrollment_status text,
  expected_graduation date,
  current_institution text,
  institution_city text,
  institution_state text,
  cumulative_gpa numeric(4,2),
  class_rank text,
  sat_score integer,
  act_score integer,
  academic_honors text,
  transcript_url text,

  -- Financial
  fafsa_completed boolean,
  fafsa_confirmation text,
  efc numeric,
  household_size integer,
  number_in_college integer,
  household_income numeric,
  receiving_aid boolean,
  federal_grants text,
  state_grants text,
  institutional_scholarships text,
  private_scholarships text,
  student_loans text,
  special_circumstances text,

  -- Essays & agreements
  essay1 text,
  essay2 text,
  certification_accepted boolean,
  terms_accepted boolean,

  -- metadata
  status text default 'submitted',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- full payload backup (keeps any additional fields)
  data jsonb
);

-- Trigger to update updated_at on modification
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.applications;
create trigger set_updated_at
  before update on public.applications
  for each row
  execute function public.set_updated_at();
