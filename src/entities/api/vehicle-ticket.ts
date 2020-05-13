import { VehicleCategory } from './vehicle-category';
import {CommonStatus} from '../../common/enums/common-status.enum';
// import { IVoyages } from './voyages';
export interface VehicleTicket {
  id: number;
  name: string;
  price: number;
  price_pretty: string;
  quantity: number;
  vehicle_category_id: number;
  vehicle_category: VehicleCategory;
  voyage_id: number;
  // voyage: IVoyages;
  created_at: string;
  updated_at: string;
  status: CommonStatus;
  status_title: string;
  type: VehicleTicketTypes;
  // Các thuộc tính làm việc với view
  isDeleting?: boolean;
  editStep: 'edit' | 'save';
}

export enum VehicleTicketTypes {
  TYPE_ALL_VOYAGE = 1,
  TYPE_PART_VOYAGE = 2
}
