import IdMapper from '../../../entities/common/id-mapper';
import {PaginationMeta} from '../../../entities/common/pagination-meta';

abstract class BaseListState<InstanceType = any, ParamsType = any, IdType = number> {
    ids: IdType[] = [];
    data: IdMapper<InstanceType> = {};
    params: ParamsType = this?.getInitParams?.() as ParamsType;
    meta: PaginationMeta = {};
    oldParams?: ParamsType;
    listLoaded = false;

    /**
     * Return an instance
     */
    abstract getInitParams?(): ParamsType;
}

export default BaseListState;
