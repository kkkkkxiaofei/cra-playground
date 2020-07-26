import React from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';

const Container = props => {
  console.log('=====list container render=====');
  const { products } = props;
  return (
    <div>
      <h2>container</h2>
      <ProductList products={products} />
    </div>
  )
};

const mapStateToProps = state => {
  console.log('=====list container mapStateToProps=====');
  return ({
    products: state.example3.products
  })
};

export default connect(mapStateToProps)(Container);
