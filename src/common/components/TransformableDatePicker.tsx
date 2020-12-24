import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {DatePickerProps} from 'antd/es/date-picker';
import moment, {Moment} from 'moment';
import {DatePicker, TimePicker} from 'antd';
import {PanelMode} from 'rc-picker/lib/interface'

declare type TransformableDatePickerProps = DatePickerProps & {
    formatter?: (value: Moment|null) => any|null;
    parser?: (value: any) => Moment|null;
    picker?: PanelMode;
}

const mlsFormatter = (value: Moment|null) => value?.valueOf();
const mlsParser = (value: any) => value ? moment(value) : value;

const TransformableDatePicker = forwardRef<any, TransformableDatePickerProps>((props, ref) => {
    const [realValue, setRealValue] = useState<Moment|null>();

    const {value, onChange, formatter, parser, picker, onSelect, ...others} = props;

    const enhanceOnchange = useCallback((value: Moment|null, dateString: string) => {
        setRealValue(value);
        const formattedValue = (formatter ?? mlsFormatter)(value) ?? value;
        onChange?.(formattedValue, dateString);
    }, [formatter, setRealValue, onChange]);

    const enhanceOnSelect = useCallback((value: Moment| null) => {
        onSelect?.((formatter ?? mlsFormatter)(value) ?? value);
    }, [formatter, onSelect])

    useEffect(() => {
        const parsedValue = (parser ?? mlsParser)(value) ?? value;
        setRealValue(parsedValue);
    }, [value, setRealValue, parser]);

    if (picker === 'time') {
        return <TimePicker onChange={enhanceOnchange}
                           value={realValue}
                           ref={ref} {...others}
                           onSelect={enhanceOnSelect}
        />
    }

    return (
        <DatePicker onChange={enhanceOnchange}
                    value={realValue}
                    ref={ref} {...others}
                    picker={picker === 'date' ? undefined : picker}
                    onSelect={enhanceOnSelect}
        />
    );
});

export default TransformableDatePicker;
