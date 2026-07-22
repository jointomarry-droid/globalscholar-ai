export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar: string | null;
          role: "student" | "university" | "organization" | "admin" | "super_admin";
          email_verified: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar?: string | null;
          role?: "student" | "university" | "organization" | "admin" | "super_admin";
          email_verified?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar?: string | null;
          role?: "student" | "university" | "organization" | "admin" | "super_admin";
          email_verified?: boolean;
          last_login_at?: string | null;
          updated_at?: string;
        };
      };
      scholarships: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          ai_summary: string | null;
          university_id: string | null;
          university_name: string;
          country: string;
          country_code: string | null;
          city: string;
          degree: string;
          field: string;
          funding: string;
          funding_amount: string | null;
          deadline: string;
          eligibility: Json;
          benefits: string[];
          documents_required: string[];
          application_url: string | null;
          language_requirements: string[];
          ielts_required: boolean;
          toefl_required: boolean;
          gre_required: boolean;
          international_students: boolean;
          renewable: boolean;
          match_score: number | null;
          verified: boolean;
          source: string;
          tags: string[];
          expires_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          ai_summary?: string | null;
          university_id?: string | null;
          university_name: string;
          country: string;
          country_code?: string | null;
          city: string;
          degree: string;
          field: string;
          funding: string;
          funding_amount?: string | null;
          deadline: string;
          eligibility?: Json;
          benefits?: string[];
          documents_required?: string[];
          application_url?: string | null;
          language_requirements?: string[];
          ielts_required?: boolean;
          toefl_required?: boolean;
          gre_required?: boolean;
          international_students?: boolean;
          renewable?: boolean;
          match_score?: number | null;
          verified?: boolean;
          source?: string;
          tags?: string[];
          expires_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          description?: string;
          ai_summary?: string | null;
          university_id?: string | null;
          university_name?: string;
          country?: string;
          country_code?: string | null;
          city?: string;
          degree?: string;
          field?: string;
          funding?: string;
          funding_amount?: string | null;
          deadline?: string;
          eligibility?: Json;
          benefits?: string[];
          documents_required?: string[];
          application_url?: string | null;
          language_requirements?: string[];
          ielts_required?: boolean;
          toefl_required?: boolean;
          gre_required?: boolean;
          international_students?: boolean;
          renewable?: boolean;
          match_score?: number | null;
          verified?: boolean;
          source?: string;
          tags?: string[];
          expires_at?: string;
          updated_at?: string;
        };
      };
      universities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          country: string;
          country_code: string | null;
          city: string;
          website: string | null;
          logo: string | null;
          description: string | null;
          ranking: number | null;
          accreditation: string[];
          verified: boolean;
          scholarship_count: number;
          student_count: number | null;
          founded_year: number | null;
          type: string | null;
          specialties: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          country: string;
          country_code?: string | null;
          city: string;
          website?: string | null;
          logo?: string | null;
          description?: string | null;
          ranking?: number | null;
          accreditation?: string[];
          verified?: boolean;
          scholarship_count?: number;
          student_count?: number | null;
          founded_year?: number | null;
          type?: string | null;
          specialties?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          country?: string;
          country_code?: string | null;
          city?: string;
          website?: string | null;
          logo?: string | null;
          description?: string | null;
          ranking?: number | null;
          accreditation?: string[];
          verified?: boolean;
          scholarship_count?: number;
          student_count?: number | null;
          founded_year?: number | null;
          type?: string | null;
          specialties?: string[];
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          student_id: string;
          scholarship_id: string;
          status: string;
          submitted_at: string | null;
          reviewed_at: string | null;
          decision_at: string | null;
          notes: string | null;
          documents: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          scholarship_id: string;
          status?: string;
          submitted_at?: string | null;
          reviewed_at?: string | null;
          decision_at?: string | null;
          notes?: string | null;
          documents?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          student_id?: string;
          scholarship_id?: string;
          status?: string;
          submitted_at?: string | null;
          reviewed_at?: string | null;
          decision_at?: string | null;
          notes?: string | null;
          documents?: string[];
          updated_at?: string;
        };
      };
      saved_scholarships: {
        Row: {
          id: string;
          student_id: string;
          scholarship_id: string;
          notes: string | null;
          saved_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          scholarship_id: string;
          notes?: string | null;
          saved_at?: string;
        };
        Update: {
          student_id?: string;
          scholarship_id?: string;
          notes?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          read?: boolean;
          action_url?: string | null;
        };
      };
      import_jobs: {
        Row: {
          id: string;
          source: string;
          format: string;
          status: string;
          total_records: number;
          processed_records: number;
          success_records: number;
          error_records: number;
          errors: string[];
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          source: string;
          format: string;
          status?: string;
          total_records?: number;
          processed_records?: number;
          success_records?: number;
          error_records?: number;
          errors?: string[];
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          source?: string;
          format?: string;
          status?: string;
          total_records?: number;
          processed_records?: number;
          success_records?: number;
          error_records?: number;
          errors?: string[];
          started_at?: string | null;
          completed_at?: string | null;
        };
      };
    };
  };
}
