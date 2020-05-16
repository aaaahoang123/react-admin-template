export const inputNumberFormatter = (value: number | string | undefined): string => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const inputNumberParser = (value: string | undefined) => value?.replace(/\$\s?|(,*)/g, '') || '';
