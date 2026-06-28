export interface Database {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string;
          title: string;
          artist: string;
          category: string;
          price: number;
          status: "Published" | "Draft";
          image_url: string | null;
          medium: string | null;
          views: number;
          sales: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist: string;
          category: string;
          price: number;
          status?: "Published" | "Draft";
          image_url?: string | null;
          medium?: string | null;
          views?: number;
          sales?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          artist?: string;
          category?: string;
          price?: number;
          status?: "Published" | "Draft";
          image_url?: string | null;
          medium?: string | null;
          views?: number;
          sales?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          action: string;
          detail: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          action: string;
          detail: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          action?: string;
          detail?: string;
          created_at?: string;
        };
      };
      site_stats: {
        Row: {
          id: string;
          key: string;
          value: string;
          change: string;
          up: boolean;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          change: string;
          up: boolean;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          change?: string;
          up?: boolean;
        };
      };
    };
  };
}

export type Artwork = Database["public"]["Tables"]["artworks"]["Row"];
export type ArtworkInsert = Database["public"]["Tables"]["artworks"]["Insert"];
export type ArtworkUpdate = Database["public"]["Tables"]["artworks"]["Update"];
export type ActivityLog = Database["public"]["Tables"]["activity_log"]["Row"];
export type SiteStat = Database["public"]["Tables"]["site_stats"]["Row"];
