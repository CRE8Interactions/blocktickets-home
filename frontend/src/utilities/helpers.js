export const COUNTDOWN_NUM = 9;
export const COUNTDOWN_DURATION = 1000;

export const getCopyrightYear = () => {
	return new Date().getFullYear();
};

export const formatNumber = (number, digits = 2) => {
	return Number(number).toFixed(digits);
};

// check to see if page should be full height
export const checkUrl = (url) => {
	var expression = /tickets|\/checkout|\/event-details/g;
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
	let total;
	if (cart.listing) {
			let totalTicketPrices = Number(
			parseFloat(cart.listing.askingPrice).toFixed(2)
		);
		let fees = Number(
			parseFloat(
				cart?.listing?.tickets[0]?.fee * cart.listing?.tickets?.length + cart?.listing?.tickets[0]?.facilityFee * cart.listing?.tickets?.length + processingFee + tax
			).toFixed(2)
		);
		total = totalTicketPrices + fees;
	} else if (cart.ticket) {
		let totalTicketPrices = Number(
			parseFloat(cart.ticket.resale ? cart.ticket.listingAskingPrice : cart.ticket.cost * cart.ticketCount).toFixed(2)
		);
		let fees = Number(
			parseFloat(
				cart.ticket.fee * cart.ticketCount + cart.ticket.facilityFee * cart.ticketCount + processingFee + tax
			).toFixed(2)
		);
		total = totalTicketPrices + fees;
	}
	
	return total;
};
