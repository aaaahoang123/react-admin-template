import {CommonStatus} from '../../common/enums/common-status.enum';
import {User} from './user';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    images: string[];
    image_urls: string[];
    status: CommonStatus;
    status_title: string;
    created_at: string;
    updated_at: string;
    price: number;
    original_price: number;
    thumbnail: string;
    thumbnail_url: string;
    creator_id: string;
    creator?: User;
}
