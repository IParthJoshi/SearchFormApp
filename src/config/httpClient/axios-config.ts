import axios from 'axios';
import {HeadersKeys} from '../../common/constants'

export const axiosInstance = axios.create({
    baseURL: 'https://nitroapi.odysol.com/nitroapi/v1/'    
})
axiosInstance.defaults.headers.common[HeadersKeys.siteItemId] = 41152;