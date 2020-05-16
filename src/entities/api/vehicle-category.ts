import {VehicleTicket} from './vehicle-ticket';
import { Vehicle } from './vehicle';
import {VehicleSeat} from './vehicle-seat';
import {CommonStatus} from '../../common/enums/common-status.enum';


export interface VehicleCategory {
  created_at: string;
  id: number;
  name: string;
  seat_quantity: number;
  status: CommonStatus;
  status_title: string;
  updated_at: string;

  vehicles_count?: number;
  vehicles?: Vehicle[];

  tickets_count?: number;
  tickets?: VehicleTicket[];

  vehicle_seats: VehicleSeat[];

  isDeleting: boolean;
}
