import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not deleted");
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl) ? true : false;
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const pathName = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

  let query = supabase.from("Cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: pathName }]);
  } else {
    query = query.update({ ...newCabin, image: pathName }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`cabin could not be ${id ? "updated" : "created"}`);
  }

  // upload image to cabin bucket
  if (hasImage) return;
  const { error: uploadErr } = await supabase.storage
    .from("Cabins")
    .upload(imageName, newCabin.image);

  if (uploadErr) {
    const { data, error } = await supabase
      .from("Cabins")
      .delete()
      .eq("id", newCabin.id);

    throw new Error("image could not be uploaded");
  }

  return data;
};
