import { isToday } from "date-fns";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("* , Cabins(*), guest(*)", { count: "exact" });

  if (filter !== null) {
    query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query.order(sortBy.field, {
      ascending: sortBy.direction === "asc" ? true : false,
    });
  }

  if (page) {
    let from = (page - 1) * 2;
    let to = from + 2 - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Booking not loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabinId(*), guestId(*)")
    .eq("id", id)
    .single();

  console.log(error);
  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

export const getTest = async () => {
  const { data, error, count } = await supabase
    .from("test2")
    .select("*, userID(phone , email)", { count: "exact" });

  console.log(data);

  return { data, error, count };
};

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  console.log(error);
  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guestId(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guestId(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  console.log(getToday());

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // if (
  //   (data.status === "unconfirmed" && isToday(new Date(data.startDate))) ||
  //   (data.status === "checked-in" && isToday(new Date(data.endDate)))
  // ) {
  //   console.log(data);
  // }

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  console.log("data => ", data);
  return data;
}

export async function updateBooking(id, obj) {
  console.log(id, obj);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  console.log(error);
  if (error) {
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  console.log(id);
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
