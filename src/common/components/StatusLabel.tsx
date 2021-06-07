import React from 'react';
import {CommonStatus} from '../enums';
import {Badge} from 'antd';
import {useTranslation} from 'react-i18next';

export interface StatusLabelProps {
    status: any;
    enumObj: any;
    enumName: string;
}

const colorMap = {
    [CommonStatus.ACTIVE]: 'success',
    [CommonStatus.INACTIVE]: 'error'
};

function StatusLabel({status, enumName, enumObj}: StatusLabelProps) {
    const {t} = useTranslation();
    return (
        <Badge status={colorMap[status as any as CommonStatus] as any ?? 'success'}
               text={t(`enums:${enumName}.${enumObj[status]}`)} />
    )
}

export default StatusLabel;
