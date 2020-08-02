import pick from 'lodash/pick';

function pickAssign(target: any, assignData: any) {
    const keys = Object.keys(target);
    const filteredData = pick(assignData, keys);
    return {
        ...target,
        ...filteredData
    };
}

export default pickAssign;
