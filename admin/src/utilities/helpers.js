// global state options 
export const stateOpt = [
    {
        label: 'New York',
        value: 'NY'
    },
    {
        label: 'Texas',
        value: 'TX'
    }
]

const checkUrl = (url) => {
    var expression = /login|\/signup/g;
    var regex = new RegExp(expression);
    return regex.test(url);
};

export const changeBackground = url => {
    if (checkUrl(url)) {
        document.body.classList.add('backgroundWhite')
    }
    else {
        document.body.classList.remove('backgroundWhite')
    }
}

export const toggleContainer = (url) => {
    if (/myevent|\/settings/g.test(url)) {
        document.querySelectorAll('#main-container').forEach(el => el.classList.remove('container')) // remove container class - shared
        document.querySelectorAll('#main-container').forEach(el => el.classList.add('sidebar-container')) // add sidebar container class - shared
    } else {
        document.querySelectorAll('#main-container').forEach(el => el.classList.add('container'))
        document.querySelectorAll('#main-container').forEach(el => el.classList.remove('sidebar-container'))
    }
}

export const formatNumber = (num) => {
    return `${parseFloat(num).toLocaleString()}`
}

export const formatCurrency = (num) => {
    return `$${parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

const removeHyphens = (string) => {
    return string.replaceAll('_', " ")
}

// remove hyphens and capitalize first letter of each word 
export const formatString = (string) => {
    let formattedString = removeHyphens(string);
    return formattedString = capitalizeString(formattedString)

}

// capitalize first letter of each word
export const capitalizeString = string => {
    return string.split(" ").map(arr => arr.charAt(0).toUpperCase() + arr.substring(1)).join(' ')
}

// put hyphens between the order id 
export const formatOrderId = (id) => {
    return id.toString().substring(0, 4) + '-' + id.toString().substring(4, 10) + '-' + id.toString().substring(10)
}

// put dots between the phone number
export const formatPhoneNumber = (number) => {
    return number.toString().substring(0, 3) + '.' + number.toString().substring(3, 6) + '.' + number.toString().substring(6)
}

export const isMatching = (input1, input2) => {
    return input1 === input2
}
