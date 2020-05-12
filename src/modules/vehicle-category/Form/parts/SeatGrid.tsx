import React from 'react';
import {IndexState} from '../../../../core/index.state';
import {connect} from 'react-redux';
import {Col, Row} from 'antd';

interface SeatGridProps {
    matrix?: number[][];
    cols: number;
}

function SeatGrid({matrix, cols}: SeatGridProps) {
    const column = Math.floor(24 / cols);
    return (
        <>
            {
                matrix?.map((row, index) => (
                    <Row gutter={8} key={`seat_grid_row_${index}`}>
                        {
                            row.map(col => (
                                <Col xs={column} key={`seat_grid_item_${col}`}>
                                    {
                                        col
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                ))
            }
        </>
    );
}

const mapStateToProps = ({vehicleCategory}: IndexState) => {
    return {
        matrix: vehicleCategory.form.matrix,
        cols: vehicleCategory.form.cols
    };
};

const connected = connect(mapStateToProps)(SeatGrid);

export default connected;
