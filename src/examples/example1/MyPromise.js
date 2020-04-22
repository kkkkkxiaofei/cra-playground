function P(fn) {
	let cbs = [];

	this.then = function(cb) {
		console.log('push cb');
		cbs.push(cb);
		return this;
	}

	function resolve(result) {
		setTimeout(() => {
			console.log('start resolve');
			cbs.forEach(cb => cb(result));
		}, 0);
	}

	fn(resolve);
}

new P((resolve) => {
	resolve(1);
})
.then(result => Promise.resolve(result))


new P((resolve) => {
	resolve(1);
})
.then(result => console.log(result))
.then(result => console.log(result))
.then(result => console.log(result))
.then(result => console.log(result))