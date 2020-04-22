import React, { useState, useMemo } from 'react';
import cb, { name } from './util';
import Child from './Child';

window.cb2 = window.cb2 || cb;

var _name = name;
var nextName = 'xiaofei';

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