// global state options 
export const stateOpt = [
    { value: 'AK', name: 'Alaska' },
    { value: 'TX', name: 'Texas' },
    { value: 'AL', name: 'Alabama' },
    { value: 'AR', name: 'Arkansas' },
    { value: 'AZ', name: 'Arizona' },
    { value: 'CA', name: 'California' },
    { value: 'CO', name: 'Colorado' },
    { value: 'CT', name: 'Connecticut' },
    { value: 'DC', name: 'District Of Columbia' },
    { value: 'DE', name: 'Delaware' },
    { value: 'FL', name: 'Florida' },
    { value: 'GA', name: 'Georgia' },
    { value: 'HI', name: 'Hawaii' },
    { value: 'IA', name: 'Iowa' },
    { value: 'ID', name: 'Idaho' },
    { value: 'IL', name: 'Illinois' },
    { value: 'IN', name: 'Indiana' },
    { value: 'KS', name: 'Kansas' },
    { value: 'KY', name: 'Kentucky' },
    { value: 'LA', name: 'Louisiana' },
    { value: 'MA', name: 'Massachusetts' },
    { value: 'MD', name: 'Maryland' },
    { value: 'ME', name: 'Maine' },
    { value: 'MI', name: 'Michigan' },
    { value: 'MN', name: 'Minnesota' },
    { value: 'MO', name: 'Missouri' },
    { value: 'MS', name: 'Mississippi' },
    { value: 'MT', name: 'Montana' },
    { value: 'NC', name: 'North Carolina' },
    { value: 'ND', name: 'North Dakota' },
    { value: 'NE', name: 'Nebraska' },
    { value: 'NH', name: 'New Hampshire' },
    { value: 'NJ', name: 'New Jersey' },
    { value: 'NM', name: 'New Mexico' },
    { value: 'NV', name: 'Nevada' },
    { value: 'NY', name: 'New York' },
    { value: 'OH', name: 'Ohio' },
    { value: 'OK', name: 'Oklahoma' },
    { value: 'OR', name: 'Oregon' },
    { value: 'PA', name: 'Pennsylvania' },
    { value: 'RI', name: 'Rhode Island' },
    { value: 'SC', name: 'South Carolina' },
    { value: 'SD', name: 'South Dakota' },
    { value: 'TN', name: 'Tennessee' },
    { value: 'TX', name: 'Texas' },
    { value: 'UT', name: 'Utah' },
    { value: 'VA', name: 'Virginia' },
    { value: 'VT', name: 'Vermont' },
    { value: 'WA', name: 'Washington' },
    { value: 'WI', name: 'Wisconsin' },
    { value: 'WV', name: 'West Virginia' },
    { value: 'WY', name: 'Wyoming' }
];


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

export const removeHyphens = (string) => {
    return string?.replaceAll('_', ' ');
}

// remove hyphens and capitalize first letter of each word 
export const formatString = (string) => {
    let formattedString = removeHyphens(string);
    return formattedString = capitalizeString(formattedString)

}

// capitalize first letter of each word
export const capitalizeString = string => {
    return string ? string.split(" ").map(arr => arr.charAt(0).toUpperCase() + arr.substring(1)).join(' ') : ''
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

export const formatPermissions = (permissions) => {
    return permissions.reduce(function (r, a) {
        r[a.attributes.key] = r[a.attributes.key] || [];
        r[a.attributes.key].push({
            id: a.id,
            name: a.attributes.name
        });
        return r;
    }, Object.create(null));
}

export const formatMembers = (members) => {
    let arr = [];
    members.map(member => arr.push({ name: `${member?.firstName} ${member?.lastName}`, role: member?.organization_role, email: member?.email, uuid: member?.uuid }))
    return arr
}
