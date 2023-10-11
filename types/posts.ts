import { RowTags } from "./tags";

export interface RowPosts {
  cover_image_url: string | null;
  created_at: string;
  descriptions?: string;
  id: number;
  stars?: string[] | null;
  tags: RowTags[];
  title: string;
  views: number | null;
  posts_url: string | null;
  user: {
    avatar_url?: string;
    name?: string;
    username?: string;
    id: string;
  };
}

export interface InsertPosts {
  cover_image_url?: string | null;
  created_at?: string;
  descriptions: string;
  id?: number;
  stars?: string[] | null;
  tags: RowTags[] | null;
  title: string;
  views?: number | null;
  user: string;
}

export interface UpdatePosts {
  cover_image_url?: string | null;
  created_at?: string;
  descriptions?: string;
  id?: number;
  stars?: string[] | null;
  tags?: RowTags[];
  title?: string;
  user?: string;
  views?: number | null;
}
