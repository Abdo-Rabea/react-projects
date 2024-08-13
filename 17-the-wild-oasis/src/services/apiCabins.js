import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase
    // using supabase clint we can create queries with from method
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins Couldn't be loaded");
  }

  return data;
}
