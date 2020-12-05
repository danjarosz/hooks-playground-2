import React,  { useState, useEffect, useCallback, useMemo }  from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';

const Ingredients = () => {
  const url = "https://ingredients-store-88a49.firebaseio.com/ingredients.json"
  const [ingredients, setIngredients] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const visibleIngredients = useMemo(() => {
    if (searchInputValue) {
      return ingredients.filter((ingredient => ingredient.title.toLowerCase().includes(searchInputValue.toLocaleLowerCase())));
    }
    return ingredients; 
  }, [ingredients, searchInputValue]);

  const loadIngredients = useCallback(() => {
    setLoading(true);
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      const loadedIngredients = [];
      for(let ingredientId in data) {
        const ingredient = {
          id: ingredientId,
          ...data[ingredientId]
        };
        loadedIngredients.push(ingredient);
      }
      setIngredients(loadedIngredients);
      setLoading(false);
      if (error) {
        setError(null);
      }
    }).catch(error => {
      setError(error.message);
    })
  }, [error]);

  const closeModal = useCallback(() => {
    setError(null);
    setLoading(false);
  }, [])

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients])

  const addIngredient = useCallback((ingredient) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': "application.json"
      }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]);
      if (error) {
        setError(null);
      }
    }).catch(error => {
      setError(error.message);
    })
  }, [error])

  const removeIngredient = useCallback((id) => {
    fetch("https://ingredients-store-88a49.firebaseio.com/ingredients/" + id + ".json", {
      method: "DELETE",
    }).then(() => {
      loadIngredients();
      if (error) {
        setError(null);
      }
    }).catch(error => {
      setError(error.message);
    })
  }, [error, loadIngredients])

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredient} loading={loading}/>
      <section>
        <Search searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue}/>
        <IngredientList ingredients={visibleIngredients} onRemoveItem={removeIngredient}/>
      </section>
      {error && (<ErrorModal onClose={closeModal}>{error}</ErrorModal>)}
    </div>
  );
}

export default Ingredients;
