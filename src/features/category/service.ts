import {CRUDService} from '../../common/service';
import {Category} from '../../models/category';
import {CategoryFormData} from './state';
import {RouterEnum} from '../../common/enums';

export class CategoryService extends CRUDService<Category, CategoryFormData, any, string> {
    getNameSpace(): string {
        return RouterEnum.categories;
    }
}

const categoryService = new CategoryService();

export default categoryService;
