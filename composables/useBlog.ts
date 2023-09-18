import { PropsBlogPosts, PropsBlogSinglePosts } from "./../types/blog";
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

  const data = payload && (payload as PropsBlogPosts[]);

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

  const data = payload && (payload[0] as PropsBlogSinglePosts);

  return { count, data, error, status, statusText };
};

const useFetchPostsByUsername = async (username: string) => {
  const client = useSupabase();
  let { data, error } = await client
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

const useCountStars = async () => {
  const client = useSupabase();
  let { data, error } = await client.from("stars").select("*");
  return {
    data,
    error,
  };
};

export const useBlog = () => {
  return {
    useFetchAllPosts,
    useFetchSinglePosts,
    useIncreaseViews,
    useCountStars,
    useFetchPostsByUsername,
  };
};
