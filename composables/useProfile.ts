import { RowProfile, UpdateProfile } from "~/types/profile";

const useSelectProfileByID = async (id: string) => {
  const client = useSupabase();

  const { data: rawData, error } = await client
    .from("profile")
    .select("*")
    .eq("id", id);

  const data = rawData![0] as RowProfile;

  return {
    data,
    error,
  };
};

const useCheckProfileByEmail = async (email: string) => {
  const client = useSupabase();

  const { data, error } = await client
    .from("profile")
    .select("email")
    .eq("email", email);

  if (data?.length! > 0) {
    return {
      data: true,
      error: "Email already exists, signin now",
    };
  } else {
    return {
      data: false,
      error: null,
    };
  }
};

const useGetAllProfileByUsername = async (username: string) => {
  const client = useSupabase();

  const { data, error } = await client
    .from("profile")
    .select("*")
    .ilike("username", `%${username}%`);

  return {
    data: data as RowProfile[],

    error,
  };
};

const useUpdateProfile = async (x: UpdateProfile) => {
  const client = useSupabase();

  const { data: prevData, error: prevError } = await useSelectProfileByID(
    x.id!
  );

  const { data, error } = await client
    .from("profile")
    //@ts-ignore
    .update({
      name: x.name ? x.name : prevData?.name,
      email: x.email ? x.email : prevData?.email,
      username: x.username ? x.username : prevData?.username,
      location: x.location ? x.location : prevData?.location,
      bio: x.bio ? x.bio : prevData?.bio,
      website_url: x.website_url ? x.website_url : prevData?.website_url,
      instagram_url: x.instagram_url
        ? x.instagram_url
        : prevData?.instagram_url,
      github_url: x.github_url ? x.github_url : prevData?.github_url,
      linkedin_url: x.linkedin_url ? x.linkedin_url : prevData?.linkedin_url,
    })
    .eq("id", x.id!)
    .select();

  return {
    data,
    error,
  };
};

export const useProfile = () => {
  return {
    useCheckProfileByEmail,
    useUpdateProfile,
    useSelectProfileByID,
    useGetAllProfileByUsername,
  };
};
