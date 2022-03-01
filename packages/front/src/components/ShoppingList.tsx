import React, { useEffect } from 'react';
import {Item} from './Item'
import {InputItem} from './InputItem'
import { useIngredient } from '../lib/useIngredients';
import { addIngredient, getIngredients } from '../lib/api';

export const ShoppingList = ()=>{
 
    const { addItem , ingredients } =useIngredient();
    useEffect(()=>{
        console.log("get ingredientes api")
        getIngredients().then((ingredient)=>{
            ingredient.forEach((ing)=>addItem(ing));
        });
    },[])

    const saveOnServer = async (ingredientFormData: any) => {
        const ing = await addIngredient(ingredientFormData);
        addItem(ing);
      };

    return(

        <div>
            {ingredients.map((it)=><Item  key={it._id} item={it}/>)}
            <div>
                <InputItem onAddItem={saveOnServer}/>
            </div>      
        </div>
    )
}