export const COUNTDOWN_NUM = 9;
export const COUNTDOWN_DURATION = 1000;

export const getCopyrightYear = () => {
    return new Date().getFullYear();
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
            parseFloat(cart.listing.askingPrice * cart.listing.tickets.length).toFixed(2)
        );
        let fees = Number(
            parseFloat(
                cart?.listing?.tickets[0]?.fee + cart?.listing?.tickets[0]?.facilityFee + processingFee + tax
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

export const ticketPrices = (ticket = null, listing = null, showFees = true) => {
    if (ticket) {
        let prices = {}
        prices['ticketCost'] = ticket?.attributes ? ticket?.attributes?.cost : ticket?.cost;
        prices['ticketServiceFee'] = ticket?.attributes ? ticket?.attributes?.fee : ticket?.fee;
        prices['ticketFacilityFee'] = ticket?.attributes ? ticket?.attributes?.facilityFee : ticket.facilityFee;
        prices['tax'] = 5;
        prices['totalFees'] = prices.ticketServiceFee + prices.ticketFacilityFee;
        prices['ticketType'] = ticket?.attributes ? ticket?.attributes?.resale ? 'Resale Ticket' : 'Standard Ticket' : ticket?.resale ? 'Resale Ticket' : 'Standard Ticket';
        prices['ticketCostWithFees'] = (prices.ticketCost + prices.totalFees).toFixed(2);
        prices['ticketName'] = ticket?.attributes ? ticket?.attributes?.name : ticket?.name;
        prices['ticketCount'] = 1;
        prices['listing'] = false;
        return prices;
    }
    if (listing) {
        let prices = {}
        prices['ticketCost'] = listing.askingPrice;
        prices['ticketServiceFee'] = listing.tickets[0]?.fee;
        prices['ticketFacilityFee'] = 0;
        prices['tax'] = 5;
        prices['totalFees'] = (listing.tickets[0].fee + 0);
        prices['ticketType'] = listing.tickets[0]?.resale ? 'Resale Ticket' : 'Standard Ticket';
        prices['ticketCostWithFees'] = (prices.ticketCost + prices.totalFees).toFixed(2);
        prices['ticketName'] = listing.tickets.length > 0 ? listing.tickets[0]?.name : '';
        prices['ticketCount'] = listing.tickets.length;
        prices['listingTotal'] = listing.askingPrice * listing.tickets.length;
        prices['listing'] = true;
        return prices;
    }
}
