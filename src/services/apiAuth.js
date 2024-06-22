import supabase, { supabaseUrl } from "./supabase.js";

export const loginUser = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("username or password is invalid");
  }

  return data;
};

export const registerUser = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: "default-user.jpg",
        fullName,
      },
    },
  });

  if (error) {
    throw new Error("sign up is failed !!!");
  }
  return data;
};

export const updateUser = async ({ fullName, avatar, password }) => {
  let updateUser = {};

  if (password) updateUser = { password };
  if (fullName) updateUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) {
    throw new Error(error?.message);
  }
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadErr) {
    throw new Error(uploadErr?.message);
  }

  const { data: updatedUser, error: err2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (err2) {
    throw new Error(err2?.message);
  }

  return updatedUser;
};

export const getUser = async () => {
  const { data: sessionData, error } = await supabase.auth.getSession();
  if (!sessionData.session) return false;

  const { data, error: err } = await supabase.auth.getUser();
  if (error) {
    throw new Error("authorization 🗿");
  }

  return { user: data.user };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("logout is faild 🗿");
  }
};
