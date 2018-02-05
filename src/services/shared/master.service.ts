import { axiosInstance } from "../../config/httpClient/axios-config";
import { Masters } from '../../models/masters.model';
import { MasterTypes } from "../../common/enum";
import { ContentBase } from "../../models/common/contentBase.model";
import { AxiosResponse, AxiosPromise } from "axios";
//import { HttpService } from './http.service';

class MasterServcie {
    private apiUrl = "master/all";

    /**
     * Gets Masters for specified master types
     * @param masterTypes 
     */
    async getMastersAsync(masterTypes: Array<MasterTypes>): Promise<Masters> {
        let masters:Masters = new Masters();
        let destinations : AxiosResponse, cruiseLines : AxiosResponse, ports : AxiosResponse, ships : AxiosResponse;
        if(masterTypes.some(x=>x === MasterTypes.Destination)){
            destinations = await axiosInstance.get(`${this.apiUrl}/${MasterTypes.Destination}`);
            if(destinations.data && destinations.data.isSucceed && destinations.data.data.length)
                masters.destinations = destinations.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Cruiseline)){
            cruiseLines = await axiosInstance.get(`${this.apiUrl}/${ MasterTypes.Cruiseline}`);
            if(cruiseLines.data && cruiseLines.data.isSucceed && cruiseLines.data.data.length)
                masters.cruiseLines = cruiseLines.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Ship)){
            ships = await axiosInstance.get(`${this.apiUrl}/${MasterTypes.Ship}`);
            if(ships.data && ships.data.isSucceed && ships.data.data.length)
                masters.ships = ships.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Destination)){
            ports = await axiosInstance.get(`${this.apiUrl}/${MasterTypes.Destination}`);
            if(ports.data && ports.data.isSucceed && ports.data.data.length)
                masters.ports = ports.data.data;
        }
        return masters;
    }
}

export const masterService = new MasterServcie();