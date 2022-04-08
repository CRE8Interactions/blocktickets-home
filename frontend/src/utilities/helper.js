export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const fullHeightContainer = (el) => {
	el.classList.add('container--full-width');

	const root = document.getElementById('root');

	root.classList.add('full-width-flex');
};

export const removeFullHeightContainer = (el) => {
	el.classList.remove('container--full-width');

	const root = document.getElementById('root');

	root.classList.remove('full-width-flex');
};

export const toggleNavContent = (show, ...rest) => {
	console.log(show);
	rest.forEach((el) => (el.style.display = show ? 'flex' : 'none'));
};

export const toggleTimer = (el, show) => {
	el.style.display = show ? 'block' : 'none';
};
