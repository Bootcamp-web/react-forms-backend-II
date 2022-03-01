
import React from 'react';
import styled from 'styled-components';

const ItemWrap = styled.div`
padding: 5px;
border: 1px solid red;
margin: 5px
`;

export const Item = ({ item: { name, quantity } }) => (
  <ItemWrap>
    {name}
    {' '}
    x
    {' '}
    {quantity}
  </ItemWrap>
);