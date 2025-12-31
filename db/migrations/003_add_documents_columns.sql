-- Migration: add document tracking columns to applications table
-- Run this in Supabase SQL editor

alter table if exists public.applications
  add column if not exists documents jsonb,
  add column if not exists uploaded_documents integer default 0,
  add column if not exists total_required_documents integer default 0,
  add column if not exists pending_recommendations integer default 0;
