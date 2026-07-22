-- GlobalScholar AI - Supabase Database Schema
-- Run this migration to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTH
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'university', 'organization', 'admin', 'super_admin')),
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  country_code TEXT,
  city TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  nationality TEXT NOT NULL,
  education_level TEXT NOT NULL CHECK (education_level IN ('bachelors', 'masters', 'phd', 'diploma', 'certificate')),
  field TEXT NOT NULL,
  gpa DECIMAL(3,2),
  gpa_scale DECIMAL(4,2),
  university TEXT,
  graduation_year INTEGER,
  work_experience INTEGER,
  languages TEXT[] DEFAULT '{}',
  ielts_score DECIMAL(2,1),
  toefl_score INTEGER,
  gre_score INTEGER,
  interests TEXT[] DEFAULT '{}',
  preferred_countries TEXT[] DEFAULT '{}',
  preferred_fields TEXT[] DEFAULT '{}',
  budget TEXT,
  resume_url TEXT,
  transcript_url TEXT,
  profile_completeness INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- UNIVERSITIES
-- ============================================

CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT,
  city TEXT NOT NULL,
  website TEXT,
  logo TEXT,
  description TEXT,
  ranking INTEGER,
  accreditation TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  scholarship_count INTEGER DEFAULT 0,
  student_count INTEGER,
  founded_year INTEGER,
  type TEXT CHECK (type IN ('public', 'private', 'community', 'research')),
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SCHOLARSHIPS
-- ============================================

CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  ai_summary TEXT,
  university_id UUID REFERENCES universities(id),
  university_name TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT,
  city TEXT NOT NULL,
  degree TEXT NOT NULL CHECK (degree IN ('bachelors', 'masters', 'phd', 'diploma', 'certificate')),
  field TEXT NOT NULL,
  funding TEXT NOT NULL CHECK (funding IN ('fully_funded', 'partial', 'tuition_only', 'stipend', 'none')),
  funding_amount TEXT,
  deadline DATE NOT NULL,
  eligibility JSONB DEFAULT '[]',
  benefits TEXT[] DEFAULT '{}',
  documents_required TEXT[] DEFAULT '{}',
  application_url TEXT,
  language_requirements TEXT[] DEFAULT '{}',
  ielts_required BOOLEAN DEFAULT false,
  toefl_required BOOLEAN DEFAULT false,
  gre_required BOOLEAN DEFAULT false,
  work_experience_required BOOLEAN DEFAULT false,
  age_limit INTEGER,
  gender TEXT,
  disability BOOLEAN DEFAULT false,
  minority BOOLEAN DEFAULT false,
  refugee BOOLEAN DEFAULT false,
  international_students BOOLEAN DEFAULT true,
  renewable BOOLEAN DEFAULT false,
  match_score INTEGER,
  verified BOOLEAN DEFAULT false,
  source TEXT CHECK (source IN ('university', 'government', 'organization', 'import', 'user_submitted')),
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- APPLICATIONS
-- ============================================

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted')),
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  decision_at TIMESTAMPTZ,
  notes TEXT,
  documents TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, scholarship_id)
);

-- ============================================
-- SAVED SCHOLARSHIPS
-- ============================================

CREATE TABLE saved_scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, scholarship_id)
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deadline_reminder', 'application_update', 'new_scholarship', 'system', 'marketing')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- IMPORT JOBS
-- ============================================

CREATE TABLE import_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('csv', 'excel', 'json', 'xml', 'rss', 'api')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  total_records INTEGER DEFAULT 0,
  processed_records INTEGER DEFAULT 0,
  success_records INTEGER DEFAULT 0,
  error_records INTEGER DEFAULT 0,
  errors TEXT[] DEFAULT '{}',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ANALYTICS
-- ============================================

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  properties JSONB DEFAULT '{}',
  source TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_scholarships_country ON scholarships(country);
CREATE INDEX idx_scholarships_degree ON scholarships(degree);
CREATE INDEX idx_scholarships_funding ON scholarships(funding);
CREATE INDEX idx_scholarships_field ON scholarships(field);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);
CREATE INDEX idx_scholarships_verified ON scholarships(verified);
CREATE INDEX idx_scholarships_slug ON scholarships(slug);
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_slug ON universities(slug);
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_saved_scholarships_student ON saved_scholarships(student_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_analytics_events_event ON analytics_events(event);
CREATE INDEX idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Student profiles
CREATE POLICY "Students can view own profile" ON student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students can update own profile" ON student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students can insert own profile" ON student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Applications
CREATE POLICY "Students can view own applications" ON applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own applications" ON applications FOR UPDATE USING (auth.uid() = student_id);

-- Saved scholarships
CREATE POLICY "Students can view own saved" ON saved_scholarships FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can save scholarships" ON saved_scholarships FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can unsave scholarships" ON saved_scholarships FOR DELETE USING (auth.uid() = student_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Scholarships are public
CREATE POLICY "Anyone can view scholarships" ON scholarships FOR SELECT USING (true);

-- Universities are public
CREATE POLICY "Anyone can view universities" ON universities FOR SELECT USING (true);
