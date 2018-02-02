import axios from 'axios';

export const axiosInstance = axios.create({
    //baseURL: ''
})

axiosInstance.defaults.headers.common['SiteItemId'] = 127334;