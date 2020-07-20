import React, { useState, useMemo } from 'react';
import cb, { name } from './util';
import Child from './Child';


var _name = name;

const childProps = {
	name,
	title: 'child title',
	des: 'child des',
	
}

const getProps = () => ({
	name,
	title: new String('child title'),
	des: 'child des',
})

const logger = () => {
	console.log('parent');
}
const Parent = (props) => {
	
	const [i, setI] = useState(0);	
	
	logger();
	return (
		<div>
			<div onClick={() => setI(i + 1)}>
				<h2>Hello pursue{i}</h2>
			</div>
			<div>
				<div>
					<Child {...getProps()} />
				</div>
			</div>
		</div>
	);
}



export default Parent;