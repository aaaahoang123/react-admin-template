import React, {forwardRef, useMemo} from 'react';
import {Radio} from 'antd';
import {enumToSelectEntries} from '../utils';
import {useTranslation} from 'react-i18next';
import {RadioGroupProps} from 'antd/es/radio';

export interface EnumRadioProps extends RadioGroupProps {
    enumObj: any;
    enumName: string;
    type?: 'default' | 'button';
}

const EnumRadio = forwardRef<any, EnumRadioProps>(({enumObj, enumName, type, ...props}, ref) => {
    const entries = useMemo(() => enumToSelectEntries(enumObj), [enumObj]);
    const {t} = useTranslation();
    return (
        <Radio.Group ref={ref} {...props}>
            {
                entries.map(entry => {
                    const Component = type === 'button' ? Radio.Button : Radio;
                    return (
                        <Component value={entry.value} key={entry.value}>
                            {t(`enums:${enumName}.${entry.label}`)}
                        </Component>
                    )
                })
            }
        </Radio.Group>
    )
});

export default EnumRadio;
