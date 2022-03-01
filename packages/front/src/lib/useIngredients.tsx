import React, { useContext, useEffect, useState } from 'react';
import { deleteIngredient } from './api';

export const IngredientsContext = React.createContext({});

export const useIngredient = () => {
  const { ingredients, addItem, removeItem } = useContext(IngredientsContext);

  const hasIngredient = (ing) => ingredients.filter((e) => e.name === ing).length > 0;

  // Función que devuelve los missingingredients
  const getMissingIngredients = (recipe) => {
    const completedIngredients = recipe
      .filter((ingredient) => ingredients.map((e) => e.name)
        .includes(ingredient));

    const setRecipe = new Set(completedIngredients);
    const missingIngredients = new Set([...recipe].filter((x) => !setRecipe.has(x)));

  
    return {
      missingIngredients,
      completed: completedIngredients.length === recipe.length,
    };
  };

  const removeIngredient = async (id) => {
    await deleteIngredient(id);
    removeItem(id);
  };

  return {
    ingredients,
    addItem,
    hasIngredient,
    getMissingIngredients,
    removeIngredient,
  };
};

export const ShoppingListManager = ({ children }) => {
  console.log('children', children);
  const [items, setItems] = useState([]);
  const addItem = (item) => {

    setItems((it) => [...it, item]);
  };

  const removeItem = (id) => {
    setItems((item) => {
      const newItems = item.filter(((it) => it._id !== id));
      return newItems;
    });
  };
  return (
    <IngredientsContext.Provider value={{ ingredients: items, addItem, removeItem }}>
      {children}
    </IngredientsContext.Provider>
  );
};