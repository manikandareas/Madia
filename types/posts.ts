export interface PropsUploadCover {
  URL: string;
  fileImage: File;
}

export interface PropsInsertPosts {
  user_id: string;
  title: string;
  descriptions: string;
  cover_image_url: string;
}
