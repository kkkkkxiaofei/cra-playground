function MyPromise(fn) {
	const INIT = -1;
	const PENDING = 0;
	const FULLFILLED = 1;
	const REJECTED = 2;

	let result = null;
	let state = INIT;

	let callbacks = [];

	this.then = function (onFullied) {
		return new MyPromise(function (resolve) {
			handle({
				onFullied,
				resolve
			});
		})
	}

	function handle(callback) {
		if (state === FULLFILLED) {
			if (callback.onFullied) {
				callback.resolve(callback.onFullied(result))
			} else {
				callback(result);
			}
		} else {
			callbacks.push(callback);
		}
	}

	function handleCallbacks() {
		while (callbacks.length) {
			handle(callbacks.shift())
		}
	}

	function onResolve(value) {
		if (value && value.then && typeof value.then === 'function') {
			return value.then(onResolve);
		}
		result = value;
		state = FULLFILLED;
		handleCallbacks();
	}

	(function () {
		state = PENDING;
		fn(onResolve);
	})()

}

export default MyPromise;