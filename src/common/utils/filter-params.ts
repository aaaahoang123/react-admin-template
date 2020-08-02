const transform = (val: any) => {
    switch (true) {
        case (val instanceof Date):
            return val.valueOf();
        case (Array.isArray(val)):
            return val.map(transform).join(',');
        default:
            return val;
    }
};

function filterParams(rawParams: any) {
    return Object.keys(rawParams)
        .filter(key => rawParams[key] || typeof rawParams[key] === 'number')
        .reduce((result, current) => ({ ...result, [current]: transform(rawParams[current]) }), {});
}

export default filterParams;
