import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

export enum FilterTransformStrategy {
  TRANSFORM,
  NON_TRANSFORM
}

function transform(val: any): any {
  switch (true) {
    case (val instanceof Date):
      return val.valueOf();
    case (Array.isArray(val)):
      return val.map(transform).join(',');
    default:
      return val;
  }
}

export function filterParams(rawParams: any, strategy: FilterTransformStrategy = FilterTransformStrategy.TRANSFORM): any {
  return Object.keys(rawParams)
    .filter(key => !isNull(rawParams[key]) && !isUndefined(rawParams[key]))
    .reduce((result, current) => {
      switch (strategy) {
        case FilterTransformStrategy.NON_TRANSFORM:
          result[current] = rawParams[current];
          break;
        case FilterTransformStrategy.TRANSFORM:
        default:
          result[current] = transform(rawParams[current]);
          break;
      }
      return result;
    }, {} as any);
}
