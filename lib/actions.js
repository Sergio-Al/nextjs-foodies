// This is a server action, only executes on the server
"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

// Server actions are async
export async function shareMeal(prevState ,formData) {
  const meal = {
    title: formData.get("title"), // Extract the title from the form data (name="title")
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
        message: 'Invalid input.',
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals'); // Revalidate the meals page, Check docs for more info
  redirect("/meals"); // Redirect to the home page
}
