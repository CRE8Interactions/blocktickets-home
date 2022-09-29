export const COUNTDOWN_NUM = 9;
export const COUNTDOWN_DURATION = 1000;

export const getCopyrightYear = () => {
    return new Date().getFullYear();
};

// format full address 
export const formatAddress = (obj) => {
    return `${obj.address_1}, ${obj.city}, ${obj.state}, ${obj.zipcode}, ${obj.country}`
}

// whether to show full start date or just start time 
export const getStartDateFormatter = (obj) => {
    return !obj?.display_start_time ? 'dateOnly' : ''
}

// format short date for cards
// display only date and start time
export const formatShortDate = (date, formatter) => {
    console.log(date);
    switch (formatter) {
        case 'dateOnly':
            return date.format('MMM D')

        default:
            return date.format('MMM D h:mm A')
    }
}
// format full date 
// display full date with start and end time and/or time only
// assumed an event is one day
export const formatDateTime = (date, formatter) => {
    switch (formatter) {
        case 'dateOnly':
            return date.format('ddd, MMM D, YYYY')

        case 'timeOnly':
            return date.format('h:mm A')

        default:
            return date.format('ddd, MMM D, YYYY h:mm A')
    }
}

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
    rest.forEach((el) => (el.style.visibility = show ? 'visible' : 'hidden'));
};

export const toggleElement = (el, show) => {
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
        prices['totalFees'] = prices.ticketCost == 0 ? 0 : prices.ticketServiceFee + prices.ticketFacilityFee;
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

export const userDevice = () => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ("orientation" in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen =
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
        }
    }
    if (hasTouchScreen) {
        return "Mobile";
    } else {
        return "Desktop";
    }
}
