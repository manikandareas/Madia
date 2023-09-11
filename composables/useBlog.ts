const useFetchAllPosts = async () => {
  const client = useSupabase();

  const { count, data, error, status, statusText } = await client
    .from("posts")
    .select("*");

  return { count, data, error, status, statusText };
};

export const useBlog = () => {
  return {
    useFetchAllPosts,
  };
};
