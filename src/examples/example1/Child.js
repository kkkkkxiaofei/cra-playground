import React, { useState } from 'react';
import { connect } from '../../libs';

const _childName = 'childName';
const Child = ({ name, title, des, send, info }) => {
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
			<div>
				{`info: ${info}`}
			</div>
			<button onClick={() => send()}>send</button>
		</div>
		
	)
}
const mapStateToProps = state => ({
	info: state.app.data,
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
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Child);