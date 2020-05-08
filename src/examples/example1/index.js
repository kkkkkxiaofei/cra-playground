import React, { useState, useMemo } from 'react';
import cb, { name } from './util';
import Child from './Child';


var _name = name;

const logger = () => {
	console.log('parent');
}
const Parent = (props) => {
	
	const [visible, setVisible] = useState(_name);	
	
	logger();
	const _visible = new Boolean(true);
	return (
		<div>
			<div onClick={() => setVisible(_visible)}>
				<h2>Hello pursue</h2>
			</div>
			<div>
				<div>
					<Child cb={cb} name={_name} />
				</div>
			</div>
		</div>
	);
}



export default Parent;