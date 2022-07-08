// check to see if page should have a container
const checkUrl = (url) => {
    var expression = /myevent|\/settings/g;
    var regex = new RegExp(expression);
    return regex.test(url);
};

export const toggleContainer = (url) => {
    if (checkUrl(url)) {
        document.querySelectorAll('#main-container').forEach(el => el.classList.remove('my-container')) // remove container class - shared
        document.querySelectorAll('#main-container').forEach(el => el.classList.add('sidebar-container')) // add sidebar container class - shared
        document.querySelector('.main').classList.add('main-content') // main page content margin-left - only main page content
    } else {
        document.querySelectorAll('#main-container').forEach(el => el.classList.add('my-container'))
        document.querySelectorAll('#main-container').forEach(el => el.classList.remove('sidebar-container'))
        document.querySelector('.main').classList.remove('main-content')

    }
}

export const formatNumber = (num) => {
    return `${parseFloat(num).toLocaleString()}`
}

export const formatCurrency = (num) => {
    return `$${parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

export const formatOrderId = (id) => {
    return id.toString().substring(0, 4) + '-' + id.toString().substring(4, 10) + '-' + id.toString().substring(10)
}
