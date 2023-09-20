import { RowPosts, InsertPosts } from "~/types/posts";

const useGetPublicURL = async (URL: string) => {
  const client = useSupabase();
  const { data } = await client.storage.from("madia").getPublicUrl(URL);
  return data.publicUrl;
};

const useUploadCover = async ({
  URL,
  fileImage,
}: {
  URL: string;
  fileImage: File;
}) => {
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
  user,
  title,
  descriptions,
  cover_image_url,
}: InsertPosts) => {
  const client = useSupabase();

  // @ts-ignore
  const { data, count, error, status, statusText } = await client
    .from("posts")
    .insert({
      user,
      title,
      descriptions,
      cover_image_url,
    });

  return { data, count, error, status, statusText };
};

const useFetchAllPosts = async () => {
  const client = useSupabase();

  const {
    count,
    data: payload,
    error,
    status,
    statusText,
  } = await client.from("posts").select(`
    id,
    title,
    cover_image_url,
    views,
    tags,
    created_at,
    user (
      username,
      name,
      avatar_url
    )
  `);

  const data = payload && (payload as RowPosts[]);

  return { count, data, error, status, statusText };
};

const useFetchSinglePosts = async (id: number) => {
  const client = useSupabase();

  const {
    count,
    data: payload,
    error,
    status,
    statusText,
  } = await client
    .from("posts")
    .select(
      `
    id,
    title,
    cover_image_url,
    views,
    tags,
    descriptions,
    created_at,
    user (
      username,
      name,
      avatar_url
    )
    `
    )
    .eq("id", id);

  const data = payload && (payload[0] as RowPosts);

  return { count, data, error, status, statusText };
};

const useFetchPostsByUsername = async (username: string) => {
  const client = useSupabase();
  let { data: payloads, error } = await client
    .from("posts")
    .select(
      `
      id,
      title,
      cover_image_url,
      views,
      tags,
      descriptions,
      created_at,
      user (
        username,
        name,
        avatar_url
      )
      `
    )
    .eq("user.username", username);

  let data = payloads as RowPosts[];
  return {
    data,
    error,
  };
};

const useIncreaseViews = async (id: number) => {
  const client = useSupabase();
  let { data, error } = await client
    // @ts-ignore
    .rpc("increment_view", {
      row_id: id,
    });
};

export const usePosts = () => {
  return {
    useGetPublicURL,
    useUploadCover,
    useInsertPosts,
    useFetchAllPosts,
    useIncreaseViews,
    useFetchPostsByUsername,
    useFetchSinglePosts,
  };
};
