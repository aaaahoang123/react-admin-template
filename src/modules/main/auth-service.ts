import axios from 'axios';
import {Rest} from '../../entities/common/rest';
import {User} from '../../entities/api/user';
import {API_URL} from '../../core/properties';

class AuthService {
    login(value: any) {
        return axios.post<Rest<User>>(`${API_URL}/get-access-token`, value)
    }

    userData() {
        return axios.get<Rest<User>>(`${API_URL}/admin/account`);
    }
}

export default new AuthService();
