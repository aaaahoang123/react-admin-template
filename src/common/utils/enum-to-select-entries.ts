
export interface SelectEntry {
    value: number;
    label: string;
}

function enumToSelectEntries(data: any): SelectEntry[] {
    return Object.entries(data)
        .filter(entry => !isNaN(Number(entry[0])))
        .map(entry => ({
            value: parseInt(entry[0], 10),
            label: entry[1] as string
        }));
}

export default enumToSelectEntries;
