import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites);
    }

    return [];
}

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchMeals = async (url) => {
        try {
            setLoading(true);
            const response = await axios(url);
            setMeals(response.data.meals || []); // if no meal found, then set to empty (by default is null)
        } catch (err) {
            setError(JSON.stringify(err.message)); // in case message is an object, make it string
            setMeals([]);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    const getRandomMeal = () => {
        if (!loading) { // to prevent multiple clicks
            fetchMeals(randomMealUrl);
        }
    }

    const addToFavorites = (meal) => {
        const alreadyExist = favorites.find(favorite => favorite.idMeal === meal.idMeal);
        if (alreadyExist) {
            return;
        }

        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(favorite => favorite.idMeal !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    return (
        <AppContext.Provider value={{ loading, error, meals, setSearchTerm, getRandomMeal, favorites, addToFavorites, removeFromFavorites, selectedItem, setSelectedItem }}>
            {children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAppContext };
export default AppProvider;
