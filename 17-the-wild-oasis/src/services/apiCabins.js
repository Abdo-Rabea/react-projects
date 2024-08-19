import supabase, { supabaseUrl } from "./supabase";

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

  //todo: john just ignored it.
  // 2. delete the image
  // https://nrgbqrcwswkjoqkioatw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // const imageName =
  // const { data, error: deleteImageError } = await supabase.storage
  //   .from("cabin-images")
  //   .remove(["folder/avatar1.png"]);
}

/**
 *
 * @param {*} newCabin
 * @param {*} id only for edit cabin
 */
export async function createEditCabin(newCabin, id) {
  //* for edit session
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // creating cabin
  const imageName = `${Math.random()}-${newCabin.image?.name?.replaceAll(
    "/",
    ""
  )}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //* for all
  let query = supabase.from("cabins");

  //A) for create cabin
  if (!id)
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ]);
  //B) for Edit cabin
  else
    query = query
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    //todo: you can check the type of error and throw approperiate error message
    throw new Error("Cabin Couldn't be added");
  }

  //* if everything is ok && newImage is passed// upload the image
  if (!hasImagePath) {
    const cabinImage = newCabin.image;
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage.from("cabin-images").upload(imageName, cabinImage);
    if (imageUploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Image couldn't be uploaded & cabin couldn't be created");
    }
  }
  return data;
}
