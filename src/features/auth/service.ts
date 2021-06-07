import {Rest} from '../../common/models/rest';
import {API_URL, BASE_URL} from '../../config/properties';
import {LoginFormData} from './state';
import axios from '../../common/axios';
import {AuthResponse} from '../../models/auth-response';

export class AuthService {
    login(value: LoginFormData) {
        return axios.post<Rest<AuthResponse>>(`${API_URL}/auth/login`, value);
    }

    userData() {
        return axios.get<Rest<AuthResponse>>(`${BASE_URL}/user-info`);
    }
}

const authService = new AuthService();

export default authService;
