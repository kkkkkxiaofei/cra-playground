import React, { useState } from 'react';
import { connect, shallowEqual } from 'react-redux';

const _childName = 'childName';
const Child = ({ name, title, des }) => {
  console.log('child');
  const [childName, setChildName] = useState('');
	return (
		<div>
			<div onClick={() => setChildName(_childName)}>
				this is child, my name is {name}
			</div>
			<div>
				{`title: ${title}`}
			</div>
			<div>
				{`des: ${des}`}
			</div>
		</div>
		
	)
}
const mapStateToProps = state => ({
	info: state.app,
	des: 'child des'
});

const mapDispatchToProps = dispatch => ({
	send: () => dispatch({ type: 'TEST' })
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
})

// export default React.memo(Child, (prev, next) => prev.config == next.config);
export default connect(mapStateToProps, mapDispatchToProps)(
	React.memo(Child, (preProps, nextProps) => {
		console.log(preProps.title == nextProps.title, preProps.title, nextProps.title)
		return preProps.des === nextProps.des && 
					preProps.info === nextProps.info &&
					preProps.send === nextProps.send &&
					preProps.title == nextProps.title
	})
);