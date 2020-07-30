import React from 'react';
import Product from './Product';

const ProductList = props => {
  const { products } = props;
  console.log('=====ProductList render=====');
  return products.map(product => (<Product {...product} />))
};

export default ProductList;
