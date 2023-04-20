const fs = require('fs');

fs.readFile('combinations.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const productCodes = data.split('\n');
    let pricesOutput = '';

    productCodes.forEach(productCode => {
        const retailPrice = calculatePrice(productCode);
        pricesOutput += `Retail price for ${productCode}: ${retailPrice}\n`;
    });

    fs.writeFile('prices.txt', pricesOutput, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Prices saved to prices.txt');
        }
    });
});


function calculatePrice(productCode) {
    const width = parseInt(productCode.match(/(\d+)X/)[1], 10);
    const length = parseInt(productCode.match(/X(\d+)/)[1], 10);
    const fastener = productCode.match(/[A-Z]{2}/) ? productCode.match(/[A-Z]{2}/)[0] : '';
    const fitting = productCode.match(/-([A-Z]{2,3})/) ? productCode.match(/-([A-Z]{2,3})/)[1] : '';

    const lengthInFeet = Math.ceil(((length / 25.4) / 12) * 2) / 2;

    let pricePerFoot;
    let fastenerPrice;

    switch (width) {
        case 40:
            pricePerFoot = 4.11;
            fastenerPrice = fastener === 'RP' ? 3.00 : fastener === 'CS' ? 15.10 : 0;
            break;
        case 50:
            pricePerFoot = 4.18;
            fastenerPrice = fastener === 'RP' ? 3.00 : fastener === 'CS' ? 15.10 : 0;
            break;
        case 60: // Add this case
            return 'Invalid'; // Return 'Invalid' if the width is 60
        case 65:
            return 'Invalid';
        case 70:
            pricePerFoot = 4.80;
            fastenerPrice = fastener === 'RP' ? 3.00 : fastener === 'CS' ? 15.10 : 0;
            break;
        case 80:
            pricePerFoot = 4.93;
            fastenerPrice = fastener === 'RP' ? 3.00 : fastener === 'CS' ? 17.14 : 0;
            break;
        case 100:
            pricePerFoot = 6.11;
            fastenerPrice = fastener === 'RP' ? 5.50 : fastener === 'CS' ? 15.10 : 0;
            break;
        case 120:
            pricePerFoot = 7.60;
            fastenerPrice = fastener === 'RP' ? 'invalid' : fastener === 'CS' ? 15.10 : 0;
            break;
        default:
            throw new Error(`Invalid width: ${width}`);
    }


    if (fastenerPrice === 'invalid') {
        return 'Invalid';
    }

    const fittingPrice = ['CFC', 'EFC', 'CFF', 'EFF', 'AGF', 'REF', 'ROF', 'TIF', 'RFB', 'RFS', 'SUF'].includes(fitting)
        ? {
            CFC: 3.49,
            EFC: 3.49,
            CFF: 7.02,
            EFF: 7.02,
            AGF: 22.83,
            REF: 4.95,
            ROF: 7.65,
            TIF: 10.00,
            RFB: 10.47,
            RFS: 33.69,
            SUF: 13.05
        }[fitting]
        : 0;

    const materialCost = lengthInFeet * pricePerFoot;
    const laborCost = 25.50;

    let total = (materialCost + fastenerPrice + fittingPrice + laborCost) * 2;
    total = Math.ceil(total / 0.05) * 0.05;

    return total;
}


module.exports = calculatePrice;
