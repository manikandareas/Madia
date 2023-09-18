export interface PropsBlogPosts {
  id: string;
  cover_image_url?: string;
  title: string;
  tags?: string[];
  stars?: number;
  views?: number;
  verified?: boolean;
  created_at: string;
  user: {
    avatar_url?: string;
    name?: string;
    username?: string;
  };
}

export interface PropsBlogSinglePosts {
  id: string;
  cover_image_url?: string;
  title: string;
  tags?: string[];
  descriptions: string;
  stars?: number;
  views?: number;
  verified?: boolean;
  created_at: string;
  user: {
    avatar_url?: string;
    name?: string;
    username?: string;
  };
}
