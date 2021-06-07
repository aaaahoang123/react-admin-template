import React, {memo, useMemo} from 'react';
import moment, {Moment} from 'moment';

interface DiffWithToDayProps {
    time: number|Date|Moment;
}

const today = moment();

const DiffWithToDay = memo(({time}: DiffWithToDayProps) => {
    const label = useMemo(() => moment(time).diff(today, 'd'), [time]);

    return (
        <>
            {label}
        </>
    );
}, (prev, next) => prev.time === next.time);

export default DiffWithToDay;
