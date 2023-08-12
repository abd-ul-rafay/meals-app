import { useAppContext } from "../context";
import BeatLoader from "react-spinners/BeatLoader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";

const Meals = () => {
  const { loading, error, meals, favorites, addToFavorites, setSelectedItem } = useAppContext();

  const findMealInFavorites = (id) => {
    // if (favorites.length < 1) return;
    const meal = favorites.find(favorite => favorite.idMeal === id);
    return meal ? true : false;
  }

  if (loading) {
    return (<div className="status-container">
      <BeatLoader
        loading={loading}
        size={15}
        speedMultiplier={1.5}
      />
    </div>)
  }

  if (error) {
    return (<div className="status-container">
      <p>Error: {error}</p>
    </div>)
  }

  if (meals.length < 1) {
    return (<div className="status-container">
      <p>No meals found! Please try again later.</p>
    </div>)
  }

  const handleFavBtn = (e, meal) => {
    e.stopPropagation();
    addToFavorites(meal);
  }

  return (
    <div className="all-meals">
      {meals.map(meal => {
        const { idMeal: mealId, strMeal: title, strMealThumb: imgSrc } = meal;

        const isMealInFavorites = findMealInFavorites(mealId);

        return (<div className="single-meal" key={mealId} onClick={() => setSelectedItem(meal)}>
          <img src={imgSrc} alt={title} />
          <div className="meal-row">
            <h2>{title}</h2>
            <button onClick={(e) => handleFavBtn(e, meal)}>
              {isMealInFavorites
                ? <AiFillHeart className="filled-heart"/>
                : <AiOutlineHeart className="outlined-heart"/>}
            </button>
          </div>
        </div>);
      })}
    </div>
  )
}

export default Meals;
