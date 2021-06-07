
function toSlug(str: string, separator: string = '-'): string {
    return str
        .toLocaleLowerCase()
        .normalize('NFD')
        // remove unicode characters
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        // remove special characters
        .replace(/([^0-9a-z-\s])/g, '')
        // replace white space with separator
        .replace(/(\s+)/g, separator)
        // replace multiple separator to single
        .replace(new RegExp(`${separator}+`, 'g'), separator)
        // replace unnecessary separator in start and end of string
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}

export default toSlug;
