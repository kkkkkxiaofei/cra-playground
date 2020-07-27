import React, { useState, useMemo } from 'react';
import { connect } from 'libs';
import Wrapper from './Wrapper';

const Shopping = (props) => {
	const { date, changeDate, createProduct, products } = props;
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

const mapStateToProps = state => {
	console.log('=====Shopping mapStateToProps=====');
	return ({
		date: state.example3.date,
		products: state.example3.products
	});
}

const mapDispatchToProps = dispatch => ({
	changeDate: () => dispatch({ type: 'CHANGE_DATE'}),
	createProduct: () => dispatch({ 
		type: 'ADD_PRODUCT',
	}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);