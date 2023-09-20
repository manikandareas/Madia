export interface RowTags {
  created_at: string;
  id: number;
  tag: string;
}

export interface InsertTags {
  created_at?: string;
  id?: number;
  tag: string;
}

export interface UpdateTags {
  created_at?: string;
  id?: number;
  tag?: string;
}
