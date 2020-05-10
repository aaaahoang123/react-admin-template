import axios from 'axios';
import {Rest} from '../../entities/common/rest';
import {User} from '../../entities/api/user';
import {API_URL} from '../../core/properties';

class AuthService {
    login(value: any) {
        return axios.post<Rest<User>>(`${API_URL}/get-access-token`, value)
            // .pipe(
            //     map(res => {
            //         localStorage.setItem(ACCESS_TOKEN_SECRET_KEY, res.data.access_token);
            //         return res.data;
            //     }),
            // );
    }

    userData() {
        return axios.get<Rest<User>>(`${API_URL}/admin/account`);
    }
}

export default new AuthService();
