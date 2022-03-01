
import React from 'react';
import styled from 'styled-components';
import { useIngredient } from '../lib/useIngredients';

const ItemWrap = styled.div`
padding: 5px;
border: 1px solid red;
margin: 5px;
display: flex;
justify-content: space-between;
`;

export const Item = ({ item: { _id, name, quantity } }) => {
  const { removeIngredient } = useIngredient();
  const handleDelete = () => {
    console.log(`delete ${_id}`);
    removeIngredient(_id);
  };
  return (
    <ItemWrap>
      <div>
        {' '}
        {name}
        {' '}
        x
        {' '}
        {quantity}
      </div>
      <div>
        <a href="#" onClick={(handleDelete)}>Delete</a>
      </div>
    </ItemWrap>
  );
};