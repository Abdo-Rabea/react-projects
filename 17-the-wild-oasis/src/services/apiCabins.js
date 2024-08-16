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
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin Couldn't be deleted");
  }
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  if (error) {
    //todo: you can check the type of error and throw approperiate error message
    throw new Error("Cabin Couldn't be added");
  }
}
