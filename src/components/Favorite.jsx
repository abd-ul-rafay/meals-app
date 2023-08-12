import { useAppContext } from "../context";

const Favorite = () => {
  const { favorites, removeFromFavorites } = useAppContext();

  return (
    <div className="favorites-row">
      <h3>Favorites</h3>
      <div className="favorite-meals">
        {favorites.map(meal => {
          const { idMeal: mealId, strMeal: title, strMealThumb: imgSrc } = meal;

          return (<div key={mealId} className="single-fav-meal">
            <img src={imgSrc} alt={title} />
            <p onClick={() => removeFromFavorites(mealId)}>remove</p>
          </div>)
        })}
      </div>
    </div>
  )
}

export default Favorite;
