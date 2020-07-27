import React from 'react';
import { connect } from 'libs';
import ProductList from './ProductList';
import Sibling from './Sibling';

const Container = props => {
  console.log('=====list container render=====');
  const { products } = props;
  return (
    <div>
      <h2>container</h2>
      <ProductList products={products} />
      <Sibling />
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
