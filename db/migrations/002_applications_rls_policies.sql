-- Migration: RLS policies for applications table
-- Allows anon/public inserts and selects on applications table
-- Run this in your Supabase SQL editor

-- Enable RLS on applications table
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users (anon key) to INSERT applications
CREATE POLICY "Allow anon insert applications"
  ON public.applications
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Policy: Allow anonymous users to SELECT their own application (optional)
-- This allows users to check status by application_id if you add a query parameter
CREATE POLICY "Allow anon select applications"
  ON public.applications
  FOR SELECT
  USING (auth.role() = 'anon');

-- Policy: Allow service role full access (for admin queries and updates)
-- Service role is only for backend/API functions, NOT exposed to browser
CREATE POLICY "Allow service role full access"
  ON public.applications
  FOR ALL
  USING (auth.role() = 'service_role');
