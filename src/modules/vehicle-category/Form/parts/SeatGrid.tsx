import React from 'react';
import {Col, Form, Input, InputNumber, Row} from 'antd';
import {IndexState} from '../../../../core/index.state';
import {connect} from 'react-redux';

interface SeatGridProps {
    cols?: number;
    rows?: number;
}

function SeatGrid({cols, rows}: SeatGridProps) {
    console.log({cols, rows});
    const handleChange = (e: any) => {
        console.log(e);
    }
    return (
        <>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{cols, rows}}
                // onFinishFailed={onFinishFailed}
            >
                <Row gutter={10}>

                </Row>
            </Form>
        </>
    );
}

const mapStateToProps = ({vehicleCategory}: IndexState) => {
    return {
        cols: vehicleCategory.form.cols,
        rows: vehicleCategory.form.rows
    };
};

const connected = connect(mapStateToProps)(SeatGrid);

export default connected;
