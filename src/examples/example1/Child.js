import React, { useState } from 'react';
import { connect } from 'react-redux';

const _childName = 'childName';
const Child = ({ cb, name, config }) => {
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

// export default React.memo(Child, (prev, next) => prev.config == next.config);
export default connect()(Child);