import {CommonStatus} from '../../common/enums/common-status.enum';

export interface VehicleSeat {
  addition_price: number;
  addition_price_pretty: string;
  created_at: string;
  id: number;
  p_col: number;
  p_row: number;
  selectable: boolean;
  status: CommonStatus;
  status_title: string;
  updated_at: string;
  vehicle_category_id: number;
  pivot: {order_id?: number, schedule_id?: number, status?: CommonStatus, vehicle_seat_id?: number};
}
