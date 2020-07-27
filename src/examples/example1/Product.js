import React, { useState, useMemo } from 'react';
import { connect } from 'libs';

const Product = ({ id, name, price, addPrice }) => {
	console.log('=====product render=====');
	return (
		<div>
			<div>name: {name}</div>
			<div onClick={() => addPrice(id)}>price: {price}</div>
		</div>
	)
}

const mapStateToProps = state => {
  console.log('=====product mapStateToProps=====');
  return ({
    visitors: state.example3.visitors
  })
};

const mapDispatchToProps = dispatch => ({
	addPrice: (id) => dispatch({ type: 'ADD_PRICE', data: id})
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
