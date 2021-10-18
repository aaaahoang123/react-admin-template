import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {PickerProps} from 'antd/es/date-picker/generatePicker';
import {PanelMode} from 'rc-picker/lib/interface'
import DatePicker from './DatePicker';

declare type TransformableDatePickerProps = PickerProps<Date> & {
    formatter?: (value: Date|null) => any|null;
    parser?: (value: any) => Date|null;
    picker?: PanelMode;
}

const mlsFormatter = (value: Date|null) => value?.valueOf();
const mlsParser = (value: any) => value ? new Date(value) : value;

const TransformableDatePicker = forwardRef<any, TransformableDatePickerProps>((props, ref) => {
    const [realValue, setRealValue] = useState<Date|null>();

    const {value, onChange, formatter, parser, picker, onSelect, ...others} = props;

    const enhanceOnchange = useCallback((value: Date|null, dateString: string) => {
        setRealValue(value);
        const formattedValue = (formatter ?? mlsFormatter)(value) ?? value;
        onChange?.(formattedValue, dateString);
    }, [formatter, setRealValue, onChange]);

    const enhanceOnSelect = useCallback((value: Date| null) => {
        onSelect?.((formatter ?? mlsFormatter)(value) ?? value);
    }, [formatter, onSelect])

    useEffect(() => {
        const parsedValue = (parser ?? mlsParser)(value) ?? value;
        setRealValue(parsedValue);
    }, [value, setRealValue, parser]);

    return (
        <DatePicker onChange={enhanceOnchange}
                    value={realValue}
                    ref={ref}
                    picker={picker}
                    onSelect={enhanceOnSelect}
                    {...others}
        />
    );
});

export default TransformableDatePicker;
