export default function MealsSlugPage({ params }) {
  return (
    <main>
      <h1>Meals</h1>
      <p>Here are all the meals you can order.</p>
      <p>your order {params.slug}</p>
    </main>
  );
}
