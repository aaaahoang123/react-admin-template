import axios from 'axios';
import {Rest} from '../../entities/common/rest';
import {User} from '../../entities/api/user';
import {API_URL} from '../../core/properties';
import {LoginFormData} from './Login/form-data';
import {AuthResponse} from '../../entities/api/auth';

class AuthService {
    login(value: LoginFormData) {
        return axios.post<Rest<AuthResponse>>(`${API_URL}/auth/login`, value);
    }

    userData() {
        return axios.get<Rest<User>>(`${API_URL}/auth/user-data`);
    }
}

const authService = new AuthService();

export default authService;
