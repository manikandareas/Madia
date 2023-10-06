export interface RowStars {
  id: string;
  created_at: string;
  user_id: string;
  post_id: string | number;
}

export interface InsertStars {
  id?: string;
  created_at?: string;
  user_id: string;
  post_id: string | number;
}

export interface UpdateStars {
  id: string;
  created_at: string;
  user_id: string;
  post_id: string | number;
}
