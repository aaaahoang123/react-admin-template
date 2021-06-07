import React, {PureComponent} from 'react';
import {InputNumber} from 'antd';
import {InputNumberProps} from 'antd/lib/input-number';

const priceFormatter = (value?: string | number) => value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
const priceParser = (value?: string) => value?.replace(/\$\s?|(,*)/g, '') as string;

class InputPrice extends PureComponent<InputNumberProps, any> {
    render() {
        const { className, placeholder, formatter, parser, ...props } = this.props;
        return (
            <InputNumber formatter={priceFormatter}
                         parser={priceParser}
                         placeholder={placeholder || 'Nhập giá'}
                         className={className || 'w-100'}
                         {...props}
            />
        );
    }
}

export default InputPrice;
