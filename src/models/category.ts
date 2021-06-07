import {CommonStatus} from '../common/enums';
import {CategoryType} from './enums/category-type';

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    icon?: string;
    sort_number: number;
    type: CategoryType;
    created_at: string;
    updated_at: string;
    is_system: boolean;
    status: CommonStatus;
    children?: Category[];
}
