import React from 'react';
import VehicleCategoryForm from './index';
import {connect} from 'react-redux';
import {IndexState} from '../../../core/index.state';
import { useParams } from 'react-router-dom';

interface VehicleCategoryFormEditProps {
}

const Component = (props: VehicleCategoryFormEditProps) => {
    let {id} = useParams();
    return (
        <>
            <VehicleCategoryForm categoryId={id} />
        </>
    )
};

const mapStateToProps = (state: IndexState) => ({
});

const VehicleCategoryEditForm = connect(mapStateToProps)(Component);

export default VehicleCategoryEditForm;
