'use client'; // error must need to be in the client side 

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An error ocurred</h1>
      <p>Failed to create meal</p>
    </main>
  );
}
