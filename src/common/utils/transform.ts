import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

function transform(destination: any, source: any): any {
    if (source instanceof Date) {
        return source;
    }
    if (isArray(destination) && isArray(source)) {
        const template = destination[0];
        return source.map(item => transform(template, item));
    }
    if (isObject(destination) && isObject(source)) {
        const result = {} as any;
        Object.keys(destination).forEach(key => {
           result[key] = transform((destination as any)[key], (source as any)[key]);
        });
        return result;
    }
    return source;
}

export default transform;


