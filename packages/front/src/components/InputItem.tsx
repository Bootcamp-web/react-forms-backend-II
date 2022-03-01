import React, { useState } from 'react';


export const InputItem = ({ onAddItem })=>{
    
    const [item, setItem] = useState({name:'', quantity:1})

    const handleAddItem =()=>{
            // console.log('Adding item');
            // console.log(item);
            onAddItem(item); 
            setItem({ name: '', quantity: 1 });
         
    }
    

    const handleChangeIngredient = (e:any) => {
       
        setItem({ ...item, name: e.target.value });
        
       
    };

    const handleChangeQuantity = (e:any) => {
        if (e.target.value.length === 0) {
          setItem({ ...item, quantity: e.target.value  });
          return;
        };
        const newQuantity = parseInt(e.target.value, 10);
       
        if (newQuantity !== NaN) {
          setItem({ ...item, quantity: newQuantity });
        }
    }   
    return(
        <div>
          <input  value={item.name} placeholder='Ingredient' onChange={handleChangeIngredient}/>
          <input  value={item.quantity} placeholder='Quantity'onChange={handleChangeQuantity}/>
          <button  onClick={handleAddItem} type='button'>Add Item</button>
        </div>
    )
}