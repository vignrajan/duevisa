// /types/database.ts
// Supabase schema types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  PostgrestVersion: "12";
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          plan: "free" | "pro" | "team";
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          reminder_email: boolean;
          reminder_sms: boolean;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          plan?: "free" | "pro" | "team";
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          reminder_email?: boolean;
          reminder_sms?: boolean;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          plan?: "free" | "pro" | "team";
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          reminder_email?: boolean;
          reminder_sms?: boolean;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          doc_type: string;
          label: string;
          visa_category: string;
          expiry_date: string;
          issued_date: string | null;
          document_number: string | null;
          notes: string | null;
          is_active: boolean;
          renewal_started: boolean;
          renewal_filed_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          doc_type: string;
          label: string;
          visa_category: string;
          expiry_date: string;
          issued_date?: string | null;
          document_number?: string | null;
          notes?: string | null;
          is_active?: boolean;
          renewal_started?: boolean;
          renewal_filed_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          doc_type?: string;
          label?: string;
          visa_category?: string;
          expiry_date?: string;
          issued_date?: string | null;
          document_number?: string | null;
          notes?: string | null;
          is_active?: boolean;
          renewal_started?: boolean;
          renewal_filed_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      family_members: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          relationship: string;
          visa_category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          relationship: string;
          visa_category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          relationship?: string;
          visa_category?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "family_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      reminder_logs: {
        Row: {
          id: string;
          document_id: string;
          user_id: string;
          days_before: number;
          sent_at: string;
          email_id: string | null;
        };
        Insert: {
          id?: string;
          document_id: string;
          user_id: string;
          days_before: number;
          sent_at?: string;
          email_id?: string | null;
        };
        Update: {
          id?: string;
          document_id?: string;
          user_id?: string;
          days_before?: number;
          sent_at?: string;
          email_id?: string | null;
        };
        Relationships: [];
      };
      checklist_progress: {
        Row: {
          id: string;
          user_id: string;
          document_id: string;
          checklist_key: string;
          completed_steps: number[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          document_id: string;
          checklist_key: string;
          completed_steps?: number[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          document_id?: string;
          checklist_key?: string;
          completed_steps?: number[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "checklist_progress_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "documents";
            referencedColumns: ["id"];
          }
        ];
      };
      attorney_leads: {
        Row: {
          id: string;
          user_id: string | null;
          visa_category: string | null;
          issue_description: string | null;
          contact_email: string | null;
          contacted_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          visa_category?: string | null;
          issue_description?: string | null;
          contact_email?: string | null;
          contacted_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          visa_category?: string | null;
          issue_description?: string | null;
          contact_email?: string | null;
          contacted_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_type: "free" | "pro" | "team";
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type FamilyMember = Database["public"]["Tables"]["family_members"]["Row"];
export type ReminderLog = Database["public"]["Tables"]["reminder_logs"]["Row"];
export type AttorneyLead = Database["public"]["Tables"]["attorney_leads"]["Row"];
export type ChecklistProgress = Database["public"]["Tables"]["checklist_progress"]["Row"];

export type DocumentWithStatus = Document & {
  daysRemaining: number;
  status: "expired" | "critical" | "warning" | "good";
};
