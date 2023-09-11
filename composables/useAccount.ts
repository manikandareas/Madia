// TODO: Create rpc function for checking previous password
const useChangePassword = async (prevPassword: string, newPassword: string) => {
  const client = useSupabase();
  const { data, error } = await client.auth.updateUser({
    password: newPassword,
  });
  return {
    data,
    error,
  };
};

const useChangeEmail = async (newEmail: string) => {
  const client = useSupabase();

  const { data, error } = await client.auth.updateUser({
    email: newEmail,
  });

  return {
    data,
    error,
  };
};

const useDestroyUser = async (id: string) => {
  const client = useSupabase();

  const { data, error } = await client.auth.admin.deleteUser(id);
  return {
    data,
    error,
  };
};

export const useUseAccount = () => {
  return {
    useDestroyUser,
    useChangePassword,
    useChangeEmail,
  };
};
