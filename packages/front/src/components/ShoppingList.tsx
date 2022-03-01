import React, { useEffect, useState } from 'react';
import { Item } from './Item';
import { InputItem } from './InputItem';
import { useIngredient } from '../lib/useIngredients';
import { addIngredient, getIngredients } from '../lib/api';

export const ShoppingList = () => {
  const { ingredients, addItem } = useIngredient();

  
  useEffect(() => {
   
    getIngredients().then((ingredient) => {
      ingredient.forEach((ing) => addItem(ing));
    });
  }, []);

  const saveOnServer = async (ingredientFormData) => {
    const ing = await addIngredient(ingredientFormData);
    addItem(ing);
  };

  return (
    <div>
      <div>
     
        <InputItem onAddItem={saveOnServer} />
      </div>
      
      {ingredients.map((it) => <Item key={it._id} item={it} />)}
    </div>
  );
};