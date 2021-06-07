import React from 'react';
import {CommonStatus} from '../enums';
import {Badge} from 'antd';
import {useTranslation} from 'react-i18next';

export interface CommonStatusLabelProps {
    status: CommonStatus;
}

const colorMap = {
    [CommonStatus.ACTIVE]: 'success',
    [CommonStatus.INACTIVE]: 'error'
};

function CommonStatusLabel({status}: CommonStatusLabelProps) {
    const {t} = useTranslation();
    return (
        <Badge status={colorMap[status] as any} text={t(`enums:CommonStatus.${CommonStatus[status]}`)} />
    )
}

export default CommonStatusLabel;
