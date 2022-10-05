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

// user permissions
const permissions = [
    { id: 1, name: "Create / edit an event" },
    { id: 2, name: "View dashboard" },
    { id: 3, name: "View orders" },
    { id: 4, name: "Issue refunds" },
    { id: 5, name: "Edit & add guest list" },
    { id: 6, name: "Attendees (check in)" },
    { id: 7, name: "Edit & add tracking links" },
    { id: 8, name: "Edit organization info" },
    { id: 9, name: "Edit roles & add team members" },
    { id: 10, name: "Edit payment information" },
    { id: 11, name: "View payouts" },
    { id: 12, name: "Edit tax status" },
]

// check if user has permission
export const checkPermission = (userPermissions, id) => {

    const permission = permissions.find(perm => perm.id == id);

    return userPermissions.organization_permissions.some(userPerm => userPerm.name === permission.name);
}


const checkUrl = (url) => {
    var expression = /login|\/signup|register/g;
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
        document.querySelector('#main-container').classList.remove('container') // remove container class 
        document.querySelector('#main-container').classList.add('sidebar-container') // add sidebar container class 
    } else {
        document.querySelector('#main-container').classList.add('container')
        document.querySelector('#main-container').classList.remove('sidebar-container')
    }
}

export const toggleSpacing = (url) => {
    const el = document.querySelector('#main-content');

    if (el) {
        if (/create|\/basic-info|\/details|\/tickets\/create|\/tickets\/edit/g.test(url)) {
            el.classList.add('pb-0')
        } else {
            el.classList.remove('pb-0')
        }
    }
}

export const calculateFees = (ticket, feeStructure, taxRates) => {
    let b = {}
    if (!ticket?.price) return;
    if (parseInt(ticket?.price) < 20) b['serviceFees'] = 1;
    if (parseInt(ticket?.price) >= 20) b['serviceFees'] = (feeStructure?.primaryOver20 / 100) * ticket?.price;
    if (parseFloat(ticket?.price)) b['paymentProcessingFee'] = (((parseFloat(feeStructure?.stripeServicePecentage) * parseFloat(ticket?.price)) / 100) + feeStructure?.stripeCharge).toFixed(2);
    b['paymentProcessingFee'] = parseFloat( b['paymentProcessingFee'])
    b['ticketPrice'] = parseFloat(ticket?.price);
    b['tax'] = (taxRates?.combinedTaxRate / 100) * ticket?.price
    b['facilityFee'] = ticket?.fee
    if (ticket?.fee) b['facilityFee'] = parseFloat(ticket?.fee)
    b['buyerTotal'] = parseFloat(ticket?.price) + parseFloat(b.serviceFees) + parseFloat(b.facilityFee) + parseFloat(b.paymentProcessingFee) + parseFloat(b.tax)
    b['payout'] = parseFloat(ticket?.price) + parseFloat(b.facilityFee)
    return b
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

// creating and getting existing member have different object properties
// creating member has name and role property
export const formatMembers = (members) => {
    let arr = [];
    members.map(member => arr.push({ firstName: member?.firstName || member?.name.split(' ')[0], lastName: member?.lastName || member?.name.split(' ')[1], role: member?.organization_role || member?.role, email: member?.email, uuid: member?.uuid }))
    return arr
}

// export const exportHTML = (data) => {
//     console.log(data);
//     const excel = create();
//     const [
//         workbook,
//         worksheet
//     ] = excel;

//     // add columns
//     worksheet.columns = addColumns(Object.keys(formatExportBook(...books)), worksheet);

//     // make the header bold
//     // in Excel the rows are 1 based instead of 0 based
//     worksheet.getRow(1).font = { bold: true };

//     // add rows
//     worksheet.addRows(addRows(Object.values(books), worksheet));

//     // format rows
//     let rowIndex = 1;
//     for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
//         worksheet.getRow(rowIndex).alignment = {
//             vertical: 'middle',
//             horizontal: 'left',
//             wrapText: true
//         };
//         worksheet.getRow(rowIndex).border = {
//             right: { style: 'thin' }
//         };

//         // fill even rows
//         if (rowIndex % 2 === 0) {
//             worksheet.getRow(rowIndex).fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: 'E0E0E0E0' }
//             };
//         }
//     }

//     // add filters to columns
//     worksheet.autoFilter = {
//         from: {
//             row: 1,
//             column: 1
//         },
//         to: {
//             row: 1,
//             column: worksheet.columns.length
//         }
//     };

//     // save excel worksheet
//     saveFile(workbook).then(alert('File saved')).catch((err) => alert(err.message));
// };

// export const create = () => {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet('my-books', {
//         properties: { defaultColWidth: 20 },
//         pageSetup: { orientation: 'landscape' }
//     });

//     return [
//         workbook,
//         sheet
//     ];
// };

// const addColumns = (names) => {
//     return names.map((name) => {
//         return {
//             header: `${name.toString().charAt(0).toUpperCase()}${name.slice(1)}`,
//             key: `${name.toString()}`
//         };
//     });
// };

// const addRows = (data) => {
//     return data.map((val) => {
//         return formatExportBook(val);
//     });
// };

// const saveFile = async (workbook) => {
//     workbook.xlsx.writeBuffer().then(function (buffer) {
//         saveAs(
//             new Blob(
//                 [
//                     buffer
//                 ],
//                 {
//                     type:
//                         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
//                 }
//             ),
//             `my-books.xlsx`
//         );
//     });
// };

