export default (ref, cb) => {
	let startX = 0;
	
	const resize = e => cb && cb(e.clientX - startX);

	const stopResize = e => {
		window.document.removeEventListener('mousemove', resize, false);
		window.document.removeEventListener('mouseup', stopResize, false);
	};

	const resizeInit = e => {
		startX = startX || e.clientX;
		window.document.addEventListener('mousemove', resize, false);
		window.document.addEventListener('mouseup', stopResize, false);
	};

	ref.addEventListener('mousedown', resizeInit, false);
	window.t = () => ref.removeEventListener('mousedown', resizeInit, false);
	return window.t;
};