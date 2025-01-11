import supabase from "./supabase";

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
