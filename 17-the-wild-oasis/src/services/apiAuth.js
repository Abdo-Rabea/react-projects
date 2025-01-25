import { ThemeProvider } from "styled-components";
import supabase from "./supabase";

//! resuable signup
export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  //* you are using the auth submodule
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  // check the current session (local and if expired get it from server)
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // get user from server
  //* note: the user data is in the session but it is more safe to get it from the server as
  //*       use can modify session data and for ex. change its privilege
  const { data, error } = await supabase.auth.getUser();
  if (!error) return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // update pwd of fullName
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return;
  // if there is avatar upload it
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update the avatar field in the user if there is no error
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://nrgbqrcwswkjoqkioatw.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
