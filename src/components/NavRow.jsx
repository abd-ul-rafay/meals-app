import { useState } from "react";
import { useAppContext } from "../context";

const NavRow = () => {
  const { setSearchTerm, getRandomMeal } = useAppContext();
  const [search, setSearch] = useState('');

  const handleSearchField = (e) => {
    setSearch(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  }

  const handleRandomMealBtn = () => {
    getRandomMeal();
    setSearch('');
    setSearchTerm('');
  }

  return (
    <nav>
      <h1>Meals App</h1>
      <div className="nav-right">
        <form className="nav-form" onSubmit={handleFormSubmit}>
          <input type="text" id="search" name="search" placeholder="Search for meal..." value={search} onChange={handleSearchField}/>
          <button type="submit">Search</button>
        </form>
        <button onClick={handleRandomMealBtn}>Random Meal</button>
      </div>
    </nav>
  )
}

export default NavRow;
