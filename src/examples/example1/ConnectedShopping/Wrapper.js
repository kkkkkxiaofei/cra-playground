import React from 'react';
import ProductListContainer from './ProductListContainer';

const Wrapper = ({ products }) => {
  console.log('=====Wrapper render=====');
  return <ProductListContainer products={products} />
}

export default React.memo(Wrapper);