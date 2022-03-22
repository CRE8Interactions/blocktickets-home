export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const checkUrl = (url) => {
	var expression = /tickets/g;
	var regex = new RegExp(expression);
	return regex.test(url);
};

export const fullHeightContainer = (url, el) => {
	if (checkUrl(url)) {
		el.classList.add('container--full-width');
	}

	const root = document.getElementById('root');

	root.style.height = '100vh';
};

export const removeFullHeightContainer = (el) => {
	console.log('remove');
	el.classList.remove('container--full-width');

	const root = document.getElementById('root');

	root.style.height = '';
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
