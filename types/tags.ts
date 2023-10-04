export interface RowTags {
  created_at: string;
  id: number;
  tag: string;
  color: string;
  descriptions: string;
}

export interface InsertTags {
  created_at?: string;
  id?: number;
  tag: string;
  color: string;
  descriptions: string;
}

export interface UpdateTags {
  created_at?: string;
  id?: number;
  tag?: string;
  color: string;
  descriptions: string;
}
