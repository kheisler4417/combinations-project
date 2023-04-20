const fastenerDescriptions = {
    RP: 'Roll Pins',
    CS: 'Clamp Set',
};

const fittingDescriptions = {
    CFC: 'Center Fitting Course Thread',
    EFC: 'End Fitting Course Thread',
    CFF: 'Center Fitting Fine Thread',
    EFF: 'End Fitting Fine Thread',
    AGF: 'AG800 fitting',
    REF: 'Reiser Fitting w/ coupling',
    ROF: 'Rollstock Fitting',
    TIF: 'Tiromat Fitting',
    RFB: 'Rapidpak Fitting - Brass',
    RFS: 'Rapidpak Fitting - 2 pc Stainless',
    SUF: 'Supervac fitting w/washer & Nut',
};

function getDescription(productCode) {
    const widthMatch = productCode.match(/05-(\d+)X/);
    const lengthMatch = productCode.match(/X(\d+(?:\.\d+)?)/);
    const fastenerMatch = productCode.match(/(RP|CS)/);
    const fittingMatch = productCode.match(/(CFC|EFC|CFF|EFF|AGF|REF|ROF|TIF|RFB|RFS|SUF)/);

    const width = widthMatch ? widthMatch[1] : '';
    const length = lengthMatch ? lengthMatch[1] : '';
    const fastenerDescription = fastenerMatch ? fastenerDescriptions[fastenerMatch[0]] : '';
    const fittingDescription = fittingMatch ? fittingDescriptions[fittingMatch[0]] : '';

    const accessories = [fastenerDescription, fittingDescription].filter((desc) => desc).join(', ');

    return `Bladder ${width}mm x ${length}mm w/ ${accessories}`;
}

module.exports = getDescription;
