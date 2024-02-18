// This is a server action, only executes on the server
"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// Server actions are async
export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"), // Extract the title from the form data (name="title")
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);
  redirect("/meals"); // Redirect to the home page
}