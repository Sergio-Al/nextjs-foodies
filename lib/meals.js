import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a slow network

  // throw new Error("Failed to fetch meals"); // simulate a failed request
  return db.prepare("SELECT * FROM meals").all(); // all is used to get all the rows
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // get is used to get a single row and ? is a placeholder
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`; // we can add a unique id to the filename to avoid conflicts.

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image.");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title, 
    @summary, 
    @instructions, 
    @creator, 
    @creator_email, 
    @image,
    @slug
  )
  `
  ).run(meal);
}
