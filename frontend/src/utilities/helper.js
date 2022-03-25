export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const checkUrl = (url) => {
	var expression = /\w*tickets|\w*\/checkout/g;

	var regex = new RegExp(expression);
	return regex.test(url);
};

export const fullHeightContainer = (url, el) => {
	if (checkUrl(url)) {
		el.classList.add('container--full-width');
	}

	const root = document.getElementById('root');

	root.classList.add('full-width-flex');
};

export const removeFullHeightContainer = (el) => {
	el.classList.remove('container--full-width');

	const root = document.getElementById('root');

	root.classList.remove('full-width-flex');
};

export const removeNavContent = (url, ...rest) => {
	if (checkUrl(url)) {
		rest.forEach((el) => (el.style.display = 'none'));
	}
};

export const addNavContent = (...rest) => {
	rest.forEach((el) => (el.style.display = 'flex'));
};
export const hideFooter = (url) => {
	const footer = document.querySelector('footer');
	if (checkUrl(url)) {
		footer.style.display = 'none';
	}
	else {
		footer.style.display = 'block';
	}
};
