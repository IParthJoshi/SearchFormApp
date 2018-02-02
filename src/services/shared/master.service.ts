import { axiosInstance } from "../../config/httpClient/axios-config";
import { Masters } from '../../models/masters.model';
import { MasterTypes } from "../../common/enum";
//import { HttpService } from './http.service';

class MasterServcie {
    private apiUrl = "master/all";

    // constructor(private http : HttpService ){
    // super();
    // }

    getMasters(){
return axiosInstance.get(`${this.apiUrl}/${MasterTypes.Destination}`).then(res =>{
    debugger;
    let masters:Masters = new Masters();
    masters.destinations = res.data.data;    
    return masters;
})
    }
}

export const masterService = new MasterServcie();