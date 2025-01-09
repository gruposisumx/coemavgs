export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string;
          name: string;
          image_url: string;
          bio: string;
          years_experience: number;
          specialties: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['professionals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['professionals']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'likes_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: 'pdf' | 'audio' | 'image' | 'video';
          url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['resources']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['resources']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          location: string;
          event_date: string;
          image_url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      contact_requests: {
        Row: {
          id: string;
          user_id: string;
          professional_id: string;
          problem_description: string;
          preferred_contact_time: string;
          contact_info: {
            phone: string;
            email: string;
          };
          is_emergency: boolean;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_requests']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_requests']['Insert']>;
      };
    };
  };
}