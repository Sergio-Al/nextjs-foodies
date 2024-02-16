import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a slow network

  // throw new Error("Failed to fetch meals"); // simulate a failed request
  return db.prepare("SELECT * FROM meals").all(); // all is used to get all the rows
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // get is used to get a single row and ? is a placeholder
}
