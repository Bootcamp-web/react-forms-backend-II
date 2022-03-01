import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoadingSpiner } from './LoadingSpinner';

const FormFlex = styled.div`
display:flex
`;
const FormElement = styled.div`
display:flex;
flex-direction: colum;
margin:5px;
`;

const ErrorMessageText = styled.p`
margin:0;
color:red
`;


const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

export const InputItem = ({ onAddItem }) => {

  const [item, setItem] = useState({ name: 'apples', quantity: 1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm(
    {
      defaultValues: { name: '', quantity: 1 },
    },
  );

  const submit = handleSubmit(async (data) => {
    await timeout(2000);
    await onAddItem(data);
    reset();
  });
  const internalState = watch();

 

  return (
    <div>
      <LoadingSpiner isLoading={isSubmitting}>
        <div style={{ padding: '20px' }}>
          <FormFlex>
            <FormElement>
              <input placeholder="Ingredient" {...register('name', { required: 'Add an ingrendient' })} />
              <Error field="name" errors={errors} />
            </FormElement>
            <FormElement>
              <input placeholder="" {...register('quantity', { required: 'Add quantity' })} />
              <Error field="quantity" errors={errors} />
            </FormElement>
            <FormElement>
              <button onClick={submit} type="button">Add item</button>
            </FormElement>
          </FormFlex>
        </div>
      </LoadingSpiner>
    </div>
  );
};