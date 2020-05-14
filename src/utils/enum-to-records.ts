export interface EnumRecord {
    label: string;
    value: string | number;
}

function enumToRecords(data: any) {
    const result: EnumRecord[] = [];
    Object.keys(data).forEach(k => {
        try {
            const value = Number(k);
            if (value || value === 0) {
                result.push({
                    label: data[value],
                    value
                });
            }
        } catch (e) {
        }
    });
    return result;
}

export default enumToRecords;
