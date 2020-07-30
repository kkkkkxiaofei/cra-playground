import React, { useState, useMemo } from 'react';
import { connect, useSelector, useDispatch } from 'libs';

const mapStateToProps = state => {
  return ({
    visitors: state.example3.visitors
  })
};

const mapDispatchToProps = dispatch => ({
	addPrice: (id) => dispatch({ type: 'ADD_PRICE', data: id})
})


const Product = ({ id, name, price }) => {
	const { visitors } = useSelector(mapDispatchToProps);
	const { addPrice } = mapDispatchToProps(useDispatch())
	console.log('=====product render=====');
	return (
		<div>
			<div>name: {name}</div>
			<div onClick={() => addPrice(id)}>price: {price}</div>
		</div>
	)
}


export default Product;
