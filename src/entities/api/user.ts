import {AuthScope} from '../enum/auth-scope';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  birthday: string;
  avatar?: string;
  avatar_url?: string;
  badge: number;
  policy_id: number;
  role: UserRole;
  created_at: string;
  updated_at: string;
  status: number;
  status_title: string;
  access_token?: string;
  last_log: number;
  last_log_str: string;

  month_count?: number;
  last_month_count?: number;
  week_count?: number;
  last_week_count?: number;

  scopes: AuthScope[];
  is_admin?: boolean;

  isDeleting: boolean;
}

export enum EMPLOYEE_STATUS {
  ACTIVE = 1,
  INACTIVE = -1
}

export enum UserRole {
  driver = 106,
  operator = 102,
  admin = 48,
  vehicle = 3
}
