import React from "react";
import {connect} from 'react-redux';
import {IndexState} from '../../../../core/index.state';
import {VehicleSeatFormData} from '../state';
import {Card, Checkbox, Col, InputNumber, Row} from "antd";
import {inputNumberFormatter, inputNumberParser} from '../../../../utils/input-number-formatter';
import {vehicleSeatFormDataChange} from '../../actions';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

const styles = require('./SeatItem.module.less');

interface SeatItemProps {
    seatIndex: number;
    seat?: VehicleSeatFormData;
    vehicleSeatFormDataChange?: typeof vehicleSeatFormDataChange;
}

function seatItemComponent({seatIndex, seat, vehicleSeatFormDataChange}: SeatItemProps) {
    const onSelectableChange = (e: CheckboxChangeEvent) => {
        vehicleSeatFormDataChange?.({selectable: e.target.checked}, seatIndex);
    };

    const onAdditionPriceChange = (e?: number) => {
        vehicleSeatFormDataChange?.({addition_price: e}, seatIndex);
    };

    return (
        <>
            <Card className={styles.card}>
                <Row justify="center">
                    <Col xs={24}>
                        <b>Ghế {seat?.p_row}.{seat?.p_col}</b>
                    </Col>

                    <Col xs={24} className="mb-1">
                        <Checkbox
                            onChange={onSelectableChange}
                            checked={seat?.selectable}
                        >
                            Có thể chọn
                        </Checkbox>
                    </Col>

                    <Col xs={24} className={'mb-1'}>
                        <InputNumber className={'w-100'}
                                     placeholder="Thêm giá"
                                     size={'small'}
                                     formatter={inputNumberFormatter}
                                     parser={inputNumberParser}
                                     onChange={onAdditionPriceChange}
                                     defaultValue={seat?.addition_price}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
}

const mapStateToProps = ({vehicleCategory}: IndexState, {seatIndex}: SeatItemProps) => ({
    seat: vehicleCategory.form.vehicle_seats[seatIndex]
});

const SeatItem = connect(mapStateToProps, {vehicleSeatFormDataChange})(seatItemComponent);

export default SeatItem;
