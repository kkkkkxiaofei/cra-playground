import React, { useState } from 'react';
import { connect } from 'react-redux';

const _childName = 'childName';
const Child = ({ cb, name }) => {
  console.log('child');
  const [childName, setChildName] = useState('');
	return (
		<div onClick={() => setChildName(_childName)}>
			this is child, my name is {name}
		</div>
	)
}
const mapStateToProps = state => ({
  info: state.app
});

export default connect()(Child);
// export default Child;