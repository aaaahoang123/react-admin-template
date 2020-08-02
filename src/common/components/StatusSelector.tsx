import React from 'react';
import enumToRecords from '../utils/enum-to-records';
import {Select} from 'antd';

const {Option} = Select;

interface PropsStatusSelector {
    status: any;
    value?: any;
    onChange?: (_: any) => void;
    placeholder?: string;
}

const StatusSelector = ({status, value, onChange, placeholder}: PropsStatusSelector) => {
    const records = enumToRecords(status);
    return (
        <Select value={value} onChange={onChange} placeholder={placeholder || 'Chọn trạng thái'} className="w-100">
            {
                records.map(({value, label}) => (
                    <Option value={value} key={value}>{label}</Option>
                ))
            }
        </Select>
    )
};

export default StatusSelector;
