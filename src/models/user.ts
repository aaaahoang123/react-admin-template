import {CommonStatus} from '../common/enums';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  email_verified_at?: string,
  created_at: string;
  updated_at: string;
  status: CommonStatus;
}
