import React, {forwardRef, useMemo} from 'react';
import {enumToSelectEntries} from '../utils';
import {SelectProps} from 'antd/lib/select';
import {Select} from 'antd';
import {useTranslation} from 'react-i18next';

export interface EnumSelectorProps extends SelectProps<any> {
    enumObj: any;
    enumName: string;
}

const EnumSelector = forwardRef<any, EnumSelectorProps>(({enumObj, enumName, placeholder, className, ...props}, ref) => {
    const entries = useMemo(() => enumToSelectEntries(enumObj), [enumObj]);
    const {t} = useTranslation();
    return (
        <Select placeholder={placeholder || 'Chọn trạng thái'}
                className={className || 'w-100'}
                ref={ref}
                {...props}
        >
            {
                entries.map(entry => (
                    <Select.Option value={entry.value} key={entry.value}>
                        {t(`enums:${enumName}.${entry.label}`)}
                    </Select.Option>
                ))
            }
        </Select>
    )
});

export default EnumSelector;
