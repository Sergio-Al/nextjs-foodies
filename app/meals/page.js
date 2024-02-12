import Link from "next/link";

export default function MealsPage() {
  return (
    <div>
      <h1>Meals</h1>
      <p>Here are all the meals you can order.</p>
      <p>
        <Link href="/meals/meal-1">Meal 1</Link>
      </p>
      <p>
        <Link href="/meals/meal-2">Meal 2</Link>
      </p>
    </div>
  );
}
