import {CommonStatus} from '../../common/enums/common-status.enum';

export class VehicleCategoryParams {
    page = 1;
    limit = 500;
    search = '';
    status = CommonStatus.ACTIVE;
}
