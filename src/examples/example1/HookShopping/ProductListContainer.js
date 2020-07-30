import React from 'react';
import { connect, useSelector } from 'libs';
import ProductList from './ProductList';
import Sibling from './Sibling';

const mapStateToProps = state => {
  return ({
    products: state.example3.products
  })
};

const Container = props => {
  const { products } = useSelector(mapStateToProps);
  console.log('=====list container render=====');

  return (
    <div>
      <h2>container</h2>
      <ProductList products={products} />
      <Sibling />
    </div>
  )
};


export default Container;
