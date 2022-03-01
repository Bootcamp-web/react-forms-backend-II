import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ErrorMessageText = styled.p`
margin:0;
color:red
`;
const FormFlex = styled.div`
display:flex
`;
const FormElement = styled.div`
display:flex;
flex-direction: colum;
margin:5px;
`;
const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

export const InputItem = ({ onAddItem })=>{
    
    const [item, setItem] = useState({name:'', quantity:1})

    const handleAddItem =()=>{
      onAddItem(item);   // viene del provider useIngredients.tsx
      setItem({ name: '', quantity: 1 });
         
    }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    
  } = useForm(
    {
      defaultValues: { name: '', quantity: 1 },
    },
  );

  const submit = handleSubmit((data)=>{
   
    reset()
  })
  
  return(
    <div>
      <FormFlex>
        <FormElement>
          <input placeholder='Ingredient' {...register('name', { required: 'Add an ingrendient' })}/>
          <Error field="name" errors={errors}></Error>
        </FormElement>
        <FormElement>
          <input placeholder='Quantity'{...register('quantity', { required: 'Add an quantity' })}/>
          <Error field="quantity" errors={errors}></Error> 
        </FormElement>
        <FormElement>  
          <button  onClick={ submit} type='button'>Add Item</button>
        </FormElement>
      </FormFlex>
    </div>
  )
}