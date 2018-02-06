import { axiosInstance } from "../../config/httpClient/axios-config";
import axios, { AxiosPromise } from "axios";
import { Masters } from '../../models/masters.model';
import { MasterTypes, HttpMethods } from "../../common/enum";
//import { AxiosResponse, AxiosPromise, AxiosRequestConfig } from "axios";

class AxiosServcie {
    
    /**
     * get request
     * @param url 
     */
    get(url : string){
        return axiosInstance.get(url);
    }

    /**
     * post request
     * @param url 
     * @param body 
     */
    post(url: string, body: any){
        let jsonBody = JSON.stringify(body);
        return axiosInstance.post(url,jsonBody);
    }

    /**
     * put request
     * @param url 
     * @param body
     */
    put(url: string, body: any) {
        let jsonBody = JSON.stringify(body);
        return axiosInstance.put(url, jsonBody);
    }

    /**
     * Sends Http Request to specified url
     * @param httpMethod
     * @param url
     * @param data
     */
    send(httpMethod: HttpMethods, url: string, data: any = null) {
        if (httpMethod === HttpMethods.Get) {
            return this.get(url);
        }
        else if (httpMethod === HttpMethods.Post) {
            return this.post(url, data);
        }
        else if (httpMethod === HttpMethods.Put) {
            return this.put(url, data);
        }
        return;        
    }
    
}

export const axiosService = new AxiosServcie();