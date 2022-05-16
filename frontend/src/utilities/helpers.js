export const COUNTDOWN_NUM = 9;
export const COUNTDOWN_DURATION = 1000;

export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const formatNumber = (number, digits = 2) => {
	return Number(number).toFixed(digits);
};

export const checkUrl = (url) => {
	var expression = /tickets|\/checkout|\/my-tickets/g;
	var regex = new RegExp(expression);
	return regex.test(url);
};

export const fullHeightContainer = (el) => {
	el.classList.add('container--full-height');

	const root = document.getElementById('root');

	root.classList.add('full-height-flex');
};

export const removeFullHeightContainer = (el) => {
	el.classList.remove('container--full-height');

	const root = document.getElementById('root');

	root.classList.remove('full-height-flex');
};

export const toggleNavContent = (show, ...rest) => {
	rest.forEach((el) => (el.style.display = show ? 'flex' : 'none'));
};

export const toggleTimer = (el, show) => {
	el.style.display = show ? 'block' : 'none';
};

export const cartTotal = (cart, processingFee, tax) => {
	let totalTicketPrices = Number(
		parseFloat(cart.ticket.attributes.resale ? cart.ticket.attributes.listingAskingPrice : cart.ticket.attributes.cost * cart.ticketCount).toFixed(2)
	);
	let fees = Number(
		parseFloat(
			cart.ticket.attributes.fee * cart.ticketCount +
				cart.ticket.attributes.facilityFee * cart.ticketCount +
				processingFee +
				tax
		).toFixed(2)
	);
	let total = totalTicketPrices + fees;
	return total;
};
