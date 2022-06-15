export const formatNumber = (num) => {
    return `${parseFloat(num).toLocaleString()}`
}

export const formatCurrency = (num) => {
    return `$${parseFloat(num).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}
