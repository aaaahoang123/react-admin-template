import axios from 'axios';
import {Rest} from '../models/rest';
import {API_URL, AUTH_STORAGE_KEY, DOMAIN} from '../../config/properties';
import {UploadFolder} from '../enums/upload-folder';

export class StorageService {
    uploadFile(file: any, folder: UploadFolder = UploadFolder.articles) {
        const form = new FormData();
        form.append('file', file);
        form.append('folder', folder);
        return axios.post<Rest<any>>(`${DOMAIN}/${API_URL}/storage/upload`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + (localStorage.getItem(AUTH_STORAGE_KEY) ?? ''),
                Accept: 'application/json'
            },
        }).then(res => res.data);
    }
}

const storageService = new StorageService();

export default storageService;
