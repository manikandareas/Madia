export interface RowProfile {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  email: string | null;
  github_url: string | null;
  id: string;
  instagram_url: string | null;
  linkedin_url: string | null;
  location: string | null;
  name: string | null;
  posts_id: number | null;
  username: string | null;
  website_url: string | null;
}

export interface InsertProfile {
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
  email?: string | null;
  github_url?: string | null;
  id?: string;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  location?: string | null;
  name?: string | null;
  posts_id?: number | null;
  username?: string | null;
  website_url?: string | null;
}

export interface UpdateProfile {
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
  email?: string | null;
  github_url?: string | null;
  id?: string;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  location?: string | null;
  name?: string | null;
  posts_id?: number | null;
  username?: string | null;
  website_url?: string | null;
}
