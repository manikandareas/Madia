export interface RowPosts {
  cover_image_url: string | null;
  created_at: string;
  descriptions?: string;
  id: number;
  stars?: string[] | null;
  tags: string[] | null;
  title: string;
  views: number | null;
  user: {
    avatar_url?: string;
    name?: string;
    username?: string;
  };
}

export interface InsertPosts {
  cover_image_url?: string | null;
  created_at?: string;
  descriptions: string;
  id?: number;
  stars?: string[] | null;
  tags?: string[] | null;
  title: string;
  user: string;
  views?: number | null;
}

export interface UpdatePosts {
  cover_image_url?: string | null;
  created_at?: string;
  descriptions?: string;
  id?: number;
  stars?: string[] | null;
  tags?: string[] | null;
  title?: string;
  user?: string;
  views?: number | null;
}
