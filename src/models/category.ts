import {CommonStatus} from '../common/enums';

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    icon?: string;
    sort_number: number;
    created_at: string;
    updated_at: string;
    status: CommonStatus;
    children?: Category[];
}
