export default (ref, cb) => {
	const resize = e => cb && cb(e);

	const stopResize = () => {
		window.document.removeEventListener('mousemove', resize, false);
		window.document.removeEventListener('mouseup', stopResize, false);
	};

	const resizeInit = () => {
		window.document.addEventListener('mousemove', resize, false);
		window.document.addEventListener('mouseup', stopResize, false);
	};

	ref.addEventListener('mousedown', resizeInit, false);

	return () => ref.removeEventListener('mousedown', resizeInit, false);
};