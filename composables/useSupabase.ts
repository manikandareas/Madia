export const useSupabase = () => {
  const client = useSupabaseClient();
  return client;
};
