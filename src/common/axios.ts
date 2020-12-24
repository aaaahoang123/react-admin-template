import Axios from 'axios';
import {notification} from 'antd';
import {APP_DEBUG, AUTH_STORAGE_KEY, DOMAIN} from '../config/properties';
import LogoutManager from '../core/auth/logout-manager';
import isString from 'lodash/isString';

const {loadProgressBar} = require('axios-progress-bar');

const axios = Axios.create({
    baseURL: DOMAIN
});

const JSON_HEADER = 'application/json';

// Add a request interceptor
axios.interceptors.request.use((config) => {

    config.headers['Content-Type'] = JSON_HEADER;
    config.headers['Accept'] = JSON_HEADER;
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(AUTH_STORAGE_KEY || '') || '';
    config.transformResponse = [(res, header) => {
        return ((!header.accept || header.accept === JSON_HEADER) && isString(res))
            ? JSON.parse(res)
            : res;
    }];
    return config;
}, (error) => {
    if (APP_DEBUG) {
        console.log(error);
    }
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    return response.data;
}, (e) => {
    const error = e.response;
    if (error?.status === 401) {
        notification.error({message: 'Thất bại', description: 'Lỗi xác thực hoặc phiên làm việc đã hết hạn.'});
        LogoutManager.logout();
    } else if (error?.status === 403) {
        notification
            .warning({
                message: 'Thất bại',
                description: 'Bạn không có quyền truy cập tài nguyên này, vui lòng liên hệ admin để được cấp quyền'
            });
    } else if (error?.data) {
        notification.error({message: 'Thất bại', description: error.data.message});
    } else {
        notification.error({message: 'Thất bại', description: 'Vui lòng thử lại sau'});
        console.error(error);
    }
    // message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10)
    return Promise.reject(e);
});


loadProgressBar({}, axios);

export default axios;
