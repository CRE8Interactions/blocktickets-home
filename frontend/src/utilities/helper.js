export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const checkUrl = (url) => {
	var expression = /tickets/g;
	var regex = new RegExp(expression);
	return regex.test(url);
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
