export interface UpdateProfileProps {
  id: string;
  name: string;
  email: string;
  username: string;
  location: string;
  bio: string;
  website_url: string;
  instagram_url: string;
  github_url: string;
  linkedin_url: string;
}

export interface ProfileProps {
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  id: string | null;
  location: string | null;
  name: string | null;
  posts_id: string | null;
  username: string | null;
  created_at: string | null;
  github_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
}
