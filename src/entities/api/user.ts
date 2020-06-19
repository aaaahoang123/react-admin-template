import {CommonStatus} from '../../common/enums/common-status.enum';

export interface User {
  id: string;
  email: string;
  phone_number: string;
  name: string;
  avatar?: string;
  avatar_url?: string;
  status: CommonStatus;
  created_at: string;
  updated_at: string;
}
