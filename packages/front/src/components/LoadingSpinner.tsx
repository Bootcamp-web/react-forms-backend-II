import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import cx from 'classnames';
import propTypes from 'prop-types';

const LoadingOverlay = styled.div`
	position: absolute;
	flex-direction: column;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(2px);
	&.activado {
		opacity: 1;
		pointer-events: auto;
	}
`;

export const LoadingSpiner = ({
  children,
  isLoading,
  loadingText = 'Loading',
}) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    {/* {isLoading && (<div style={overlayStyle}>{loadingText}</div>)} */}
    {isLoading && (
    <LoadingOverlay className={cx({ activado: isLoading })}>
      {loadingText}
      <div style={{ paddingBottom: 15 }} />
      <CircularProgress />
    </LoadingOverlay>
    )}
    <div>{children}</div>
  </div>
);

// Valores por defecto del componente
LoadingSpiner.defaultProps = {
  isLoading: false,
  children: undefined,
  loadingText: '',
};

// node: componente de react
LoadingSpiner.propTypes = {
  isLoading: propTypes.bool,
  children: propTypes.node,
  loadingText: propTypes.string,
};