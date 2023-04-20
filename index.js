const fs = require('fs');
const calculatePrice = require('./calculatePrice');

const widths = ['40', '50', '60', '65', '70', '80', '100', '120'];
const lengths = [
    '120',
    '140',
    '180',
    '220',
    '225',
    '230',
    '240',
    '245',
    '250',
    '255',
    '258',
    '260',
    '263',
    '265',
    '270',
    '273',
    '275',
    '280',
    '285',
    '289',
    '290',
    '292',
    '293',
    '295',
    '297',
    '298',
    '299',
    '300',
    '305',
    '306',
    '310',
    '311',
    '315',
    '318',
    '320',
    '323',
    '325',
    '328',
    '329',
    '330',
    '335',
    '339',
    '340',
    '342',
    '343',
    '345',
    '350',
    '355',
    '357',
    '360',
    '365',
    '368',
    '370',
    '373',
    '375',
    '377',
    '380',
    '381',
    '383',
    '385',
    '389',
    '390',
    '393',
    '395',
    '396',
    '397',
    '399',
    '400',
    '405',
    '406',
    '410',
    '412',
    '414',
    '415',
    '417',
    '420',
    '425',
    '427',
    '430',
    '432',
    '435',
    '438',
    '440',
    '445',
    '450',
    '452',
    '455',
    '457',
    '458',
    '460',
    '464',
    '465',
    '470',
    '475',
    '476',
    '479',
    '480',
    '485',
    '490',
    '495',
    '497',
    '500',
    '505',
    '510',
    '512',
    '514.35',
    '515',
    '517',
    '520',
    '525',
    '530',
    '535',
    '540',
    '545',
    '550',
    '555',
    '559',
    '560',
    '565',
    '570',
    '575',
    '580',
    '585',
    '587',
    '590',
    '595',
    '597',
    '600',
    '605',
    '610',
    '620',
    '635',
    '640',
    '645',
    '648',
    '650',
    '650',
    '673',
    '689',
    '695',
    '700',
    '705',
    '711',
    '736',
    '790',
    '820',
    '840',
    '850',
    '950',
    '1004',
    '1160',
    '1165',
    '1253',
];
const fasteners = ['', 'RP', 'CS'];
const fittings = ['', 'CFC', 'EFC', 'CFF', 'EFF', 'AGF', 'REF', 'ROF', 'TIF', 'RFB', 'RFS', 'SUF'];

const combinations = [];

widths.forEach(width => {
    lengths.forEach(length => {
        fasteners.forEach(fastener => {
            fittings.forEach(fitting => {
                const fastenerPart = fastener ? fastener : '';
                const fittingPart = fitting ? '-' + fitting : '';
                const combination = `05-${width}X${length}${fastenerPart}${fittingPart}`;
                combinations.push(combination);
            });
        });
    });
});

fs.writeFile('combinations.txt', combinations.join('\n'), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Combinations saved to combinations.txt');
    }
});

const productCodes = [
    '05-40X120RP-CFC',
    '05-40X120RP-EFC',
    '05-40X120RP-CFF',
    // ... and so on, include the rest of your generated product codes
];

const prices = productCodes.map(productCode => {
    const price = calculatePrice(productCode);
    return {
        productCode,
        price: price === 'Invalid' ? 'Invalid' : `$${price.toFixed(2)}`,
    };
});

console.log(prices);
