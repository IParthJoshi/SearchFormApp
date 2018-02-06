import { axiosInstance } from "../../config/httpClient/axios-config";
import axios from "axios";
import { Masters } from '../../models/masters.model';
import { MasterTypes } from "../../common/enum";
import { ContentBase } from "../../models/common/contentBase.model";
import { AxiosResponse, AxiosPromise } from "axios";
//import { HttpService } from './http.service';

class MasterServcie {
    private mastersApiUrl = "master/all";

    /**
     * Gets Masters for specified master types
     * @param masterTypes 
     */
    async getMastersAsync(masterTypes: Array<MasterTypes>): Promise<Masters> {        
        let masters:Masters = new Masters();
        // if(masterTypes.length === 4){
        //     //this.getAllMastersAsync();            
        // }
        let destinations : AxiosResponse, cruiseLines : AxiosResponse, ports : AxiosResponse, ships : AxiosResponse;
        if(masterTypes.some(x=>x === MasterTypes.Destination)){
            destinations = await axiosInstance.get(`${this.mastersApiUrl}/${MasterTypes.Destination}`);
            if(destinations.data && destinations.data.isSucceed && destinations.data.data.length)
                masters.destinations = destinations.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Cruiseline)){
            cruiseLines = await axiosInstance.get(`${this.mastersApiUrl}/${ MasterTypes.Cruiseline}`);
            if(cruiseLines.data && cruiseLines.data.isSucceed && cruiseLines.data.data.length)
                masters.cruiseLines = cruiseLines.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Ship)){
            ships = await axiosInstance.get(`${this.mastersApiUrl}/${MasterTypes.Ship}`);
            if(ships.data && ships.data.isSucceed && ships.data.data.length)
                masters.ships = ships.data.data;            
        }
        if(masterTypes.some(x=>x === MasterTypes.Port)){
            ports = await axiosInstance.get(`${this.mastersApiUrl}/${MasterTypes.Port}`);
            if(ports.data && ports.data.isSucceed && ports.data.data.length)
                masters.ports = ports.data.data;
        }
        return masters;
    }

    async getAllMastersAsync(masterTypes: Array<MasterTypes>){
        let masters:Masters = new Masters();
        let destinations : AxiosResponse, cruiseLines : AxiosResponse, ports : AxiosResponse, ships : AxiosResponse;    
      await axios.all(masterTypes.map(x => axiosInstance.get(`${this.mastersApiUrl}/${x}`)))
      .then(axios.spread(function (cruiseLineRes,shipRes,destinationRes,portRes) {            
            masters.cruiseLines = cruiseLineRes.data && cruiseLineRes.data.isSucceed && cruiseLineRes.data.data.length ? cruiseLineRes.data.data: null;
            masters.ships = shipRes.data && shipRes.data.isSucceed && shipRes.data.data.length ? shipRes.data.data:null;
            masters.destinations = destinationRes.data && destinationRes.data.isSucceed && destinationRes.data.data.length ? destinationRes.data.data : null;
            masters.ports = portRes.data && portRes.data.isSucceed && portRes.data.data.length ? portRes.data.data : null;
        }))
        return masters;        
    }
}

export const masterService = new MasterServcie();