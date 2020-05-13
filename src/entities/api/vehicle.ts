import {VehicleCategory} from './vehicle-category';
import {CommonStatus} from '../../common/enums/common-status.enum';

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  color: string;
  last_maintenance: string;
  vehicle_category_id: number;
  vehicle_category: VehicleCategory;
  created_at: string;
  updated_at: string;
  status: CommonStatus;
  status_title: string;
  meter: number;
  meter_pretty: string;
  // maintenance_tracks: IMaintenanceTrack[];
  // maintenance_track_maps: {
  //   [key: number]: IMaintenanceTrack
  // };

  // user_id?: number;
  // user?: UserInterface;

  isDeleting: boolean;
}
