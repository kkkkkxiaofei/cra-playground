import React, { useState, useMemo } from 'react';
import cb, { name } from './util';
import Child from './Child';


var _name = name;

const logger = () => {
	console.log('parent');
}
const Parent = (props) => {
	
	const [config, setConfig] = useState({ a: 1 });	
	
	logger();
	return (
		<div>
			<div onClick={() => setConfig({ a:1 })}>
				<h2>Hello pursue</h2>
			</div>
			<div>
				<div>
					<Child cb={cb} name={_name} config={config} />
				</div>
			</div>
		</div>
	);
}



export default Parent;