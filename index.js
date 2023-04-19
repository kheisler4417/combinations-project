const fs = require('fs');

const widths = ['40', '50', '60', '65', '70', '80', '100', '120'];
const lengths = ['120', '140', '180', '220', '225', '230', '240', '245', '250', '255', '258'];
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
