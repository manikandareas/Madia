import { PropsInsertPosts, PropsUploadCover } from "~/types/posts";

const useGetPublicURL = async (URL: string) => {
  const client = useSupabase();
  const { data } = await client.storage.from("madia").getPublicUrl(URL);
  return data.publicUrl;
};

const useUploadCover = async ({ URL, fileImage }: PropsUploadCover) => {
  const client = useSupabase();
  const { data, error } = await client.storage
    .from("madia")
    .upload(URL, fileImage);

  return {
    data,
    error,
  };
};

const useInsertPosts = async ({
  user_id,
  title,
  descriptions,
  cover_image_url,
}: PropsInsertPosts) => {
  const client = useSupabase();

  // @ts-ignore
  const { data, count, error, status, statusText } = await client
    .from("posts")
    .insert({
      user_id,
      title,
      descriptions,
      cover_image_url,
    });

  return { data, count, error, status, statusText };
};

export const usePosts = () => {
  return {
    useGetPublicURL,
    useUploadCover,
    useInsertPosts,
  };
};
