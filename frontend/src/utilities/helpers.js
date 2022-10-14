export const COUNTDOWN_NUM = 9;
export const COUNTDOWN_DURATION = 1000;

export const formatCurreny =(number) => {
    return parseFloat(number).toFixed(2)
}

export const titleCase = (str) => {
    return str?.toLowerCase().split(' ').map(function (word) {
      return (word?.charAt(0).toUpperCase() + word?.slice(1));
    }).join(' ');
}

export const getCopyrightYear = () => {
    return new Date().getFullYear();
};

// sort events by date
export const sortBy = (arr, obj) => {
    return arr.sort(function (a, b) {
        // orders and events array have different object structures 
        if (obj) {
            a = a[obj].start;
            b = b[obj].start
        } else {
            a = a.start;
            b = b.start;
        }
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a) - new Date(b);
    });
}

// format full address 
export const formatAddress = (obj) => {
    return `${obj.address_1}, ${obj.city}, ${obj.state}, ${obj.zipcode}, ${obj.country}`
}

// whether to show full start date or just start time 
export const getStartDateFormatter = (obj) => {
    return !obj?.display_start_time ? 'dateOnly' : ''
}

// format short date for cards and search items with no year
// display only date and start time
export const formatShortDate = (date, formatter) => {
    switch (formatter) {
        case 'dateOnly':
            return date.format('MMM D')

        case 'dateOnlyWithDay':
            return date.format('ddd, MMM D')

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

export const ticketPrices = (ticket = null, listing = null, showFees = true, taxRates, feeStructure) => {
    if (ticket) {
        let prices = {}
        prices['ticketCost'] = ticket?.attributes ? ticket?.attributes?.cost : ticket?.cost;
        if (parseInt(prices['ticketCost']) < 20) prices['serviceFees'] = 1;
        if (parseInt(prices['ticketCost']) >= 20) prices['serviceFees'] = (feeStructure?.primaryOver20 / 100) * prices['ticketCost'];
        if (parseFloat(prices['ticketCost'])) prices['paymentProcessingFee'] = (((parseFloat(feeStructure?.stripeServicePecentage) * parseFloat(prices['ticketCost'])) / 100) + feeStructure?.stripeCharge).toFixed(2);
        prices['paymentProcessingFee'] = parseFloat( prices['paymentProcessingFee'])
        prices['ticketServiceFee'] = prices['serviceFees'];
        prices['ticketFacilityFee'] = ticket?.attributes ? ticket?.attributes?.fee : ticket.fee;
        prices['tax'] = (taxRates?.combinedTaxRate / 100) * prices['ticketCost'];
        prices['totalFees'] = prices.ticketCost == 0 ? 0 : parseFloat(prices['serviceFees']) + parseFloat(prices['ticketFacilityFee']) + parseFloat(prices.tax) + parseFloat(prices.paymentProcessingFee);
        prices['ticketType'] = ticket?.attributes ? ticket?.attributes?.resale ? 'Resale Ticket' : 'Standard Ticket' : ticket?.resale ? 'Resale Ticket' : 'Standard Ticket';
        prices['ticketCostWithFees'] = parseFloat(prices['ticketCost']) + parseFloat(prices['ticketServiceFee']) + parseFloat(prices['ticketFacilityFee']) + parseFloat(prices['paymentProcessingFee']) + parseFloat(prices['tax']);
        prices['ticketCostWithFees'] = parseFloat(prices['ticketCostWithFees'])
        prices['ticketName'] = ticket?.attributes ? ticket?.attributes?.name : ticket?.name;
        prices['buyerTotal'] = parseFloat(prices['ticketCost']) + parseFloat(prices['ticketServiceFee']) + parseFloat(prices['ticketFacilityFee']) + parseFloat(prices['paymentProcessingFee']) + parseFloat(prices['tax'])
        prices['ticketCount'] = 1;
        prices['listing'] = false;
        return prices;
    }
    if (listing) {
        let prices = {}
        prices['ticketCost'] = listing.askingPrice;
        if (parseFloat(prices['ticketCost'])) prices['paymentProcessingFee'] = (((parseFloat(feeStructure?.stripeServicePecentage) * parseFloat(prices['ticketCost'])) / 100) + feeStructure?.stripeCharge).toFixed(2);
        prices['paymentProcessingFee'] = parseFloat( prices['paymentProcessingFee'])
        prices['ticketServiceFee'] = (feeStructure?.secondaryServiceFeeSeller / 100) * prices.ticketCost;
        prices['ticketFacilityFee'] = 0;
        prices['tax'] = (taxRates?.combinedTaxRate / 100) * prices.ticketCost;
        prices['totalFees'] = parseFloat(prices['ticketServiceFee']) + prices['paymentProcessingFee']
        prices['ticketType'] = listing.tickets[0]?.resale ? 'Resale Ticket' : 'Standard Ticket';
        prices['ticketCostWithFees'] = (prices.ticketCost + prices.totalFees + prices.tax).toFixed(2);
        prices['ticketCostWithFees'] = parseFloat(prices['ticketCostWithFees'])
        prices['ticketName'] = listing.tickets.length > 0 ? listing.tickets[0]?.name : '';
        prices['ticketCount'] = listing.tickets.length;
        prices['listingTotal'] = listing.askingPrice;
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
