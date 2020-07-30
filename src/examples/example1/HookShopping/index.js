import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'libs';
import Wrapper from './Wrapper';

const mapStateToProps = state => {
	return ({
		date: state.example3.date,
		products: state.example3.products
	});
}

const mapDispatchToProps = dispatch => ({
	changeDate: () => dispatch((state, dispatch) => dispatch({ type: 'CHANGE_DATE'})),
	createProduct: () => dispatch({ 
		type: 'ADD_PRODUCT',
	}),
});

const Shopping = (props) => {
	const shoppingState = useSelector(mapStateToProps);
	const dispatch = useDispatch();
	const { date, products } = shoppingState;
	const { changeDate, createProduct } = mapDispatchToProps(dispatch);
	console.log('=====Shopping render=====');
	return (
		<div>
			<div>
				<h2>Welcome to shop!{date}</h2>
				<span onClick={changeDate}>change date</span>
			</div>
			<div>
				<button onClick={createProduct}>create product</button>
			</div>
			<Wrapper products={products} />
		</div>
	);
}



export default Shopping;