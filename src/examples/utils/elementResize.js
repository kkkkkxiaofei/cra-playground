export default (ref, cb, direction = 'h') => {
	let startX = 0, startY = 0;
	
	const resize = e => cb && cb('v' === direction ? e.clientY - startY : e.clientX - startX);

	const stopResize = () => {
		window.document.removeEventListener('mousemove', resize, false);
		window.document.removeEventListener('mouseup', stopResize, false);
	};

	const resizeInit = e => {
		startX = startX || e.clientX;
		startY = startY || e.clientY;
		window.document.addEventListener('mousemove', resize, false);
		window.document.addEventListener('mouseup', stopResize, false);
	};

	ref.addEventListener('mousedown', resizeInit, false);

	return () => ref.removeEventListener('mousedown', resizeInit, false);
};