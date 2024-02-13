import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function MealsGrid({ meals }) {
  return (
    <ul>
      {meals.map((meal) => (
        <li className={classes.meals} key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
