-- DueVisa Database Schema
-- Run this in your Supabase SQL Editor

-- ─── Profiles ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  reminder_email BOOLEAN DEFAULT true,
  reminder_sms BOOLEAN DEFAULT false,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Documents ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doc_type TEXT NOT NULL,
  label TEXT NOT NULL,
  visa_category TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  issued_date DATE,
  document_number TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  renewal_started BOOLEAN DEFAULT false,
  renewal_filed_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Family Members ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  visa_category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Reminder Logs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reminder_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  days_before INTEGER NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  email_id TEXT
);

-- ─── Attorney Leads ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attorney_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  visa_category TEXT,
  issue_description TEXT,
  contact_email TEXT,
  contacted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attorney_leads ENABLE ROW LEVEL SECURITY;

-- ─── RLS Policies ─────────────────────────────────────────────────────────────

-- Profiles: Allow users to manage their own profile
CREATE POLICY "Users can select own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Documents: Allow users to manage their own documents
CREATE POLICY "Users can select own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON documents FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (auth.uid() = user_id);

-- Family Members: Allow users to manage their own family
CREATE POLICY "Users can select own family" ON family_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own family" ON family_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own family" ON family_members FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own family" ON family_members FOR DELETE USING (auth.uid() = user_id);

-- Reminder Logs: Allow users to see their own logs
CREATE POLICY "Users can select own reminders" ON reminder_logs FOR SELECT USING (auth.uid() = user_id);

-- Attorney Leads: Anyone can insert, users can see own
CREATE POLICY "Anyone can insert attorney leads" ON attorney_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can select own attorney leads" ON attorney_leads FOR SELECT USING (auth.uid() = user_id);

-- ─── Auto-create profile on signup ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─── Updated_at trigger ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Checklist Progress ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  checklist_key TEXT NOT NULL,
  completed_steps INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, document_id)
);

ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own checklist progress"
ON checklist_progress
FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER update_checklist_progress_updated_at
  BEFORE UPDATE ON checklist_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
