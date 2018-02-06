import { axiosInstance } from "../config/httpClient/axios-config";
import axios from "axios";
import { AxiosResponse, AxiosPromise } from "axios";

import { Facet } from '../models/facet.model';
import { FacetValue } from '../models/facetValue.model';
import { Result, Page } from '../models/resultTyped.model';
import { GenericParams,Constants } from '../common/constants';
import { Masters } from '../models/masters.model';
import { MasterTypes,HttpMethods } from "../common/enum";
import { ContentBase } from "../models/common/contentBase.model";
import { Filter } from '../models/filter.model';
import { masterService } from "./shared/master.service";
import { axiosService } from "./shared/axios.service";

class CruiseServcie {
    //private apiUrl = "cruise/all";
    private cruiseFacetsApiUrl = "/v1/cruise/facets";

/**
 * Gets Cruise Facets
 * @param queryString 
 * @param filters 
 */
    getCruiseFacets(queryString : string = "", filters:Array<Filter>|null = null): Promise<Result<Page<any>>>{        
        //let httpMethod: HttpMethods = filters ? HttpMethods.Post : HttpMethods.Get;
        // return axiosService.send(
        //     httpMethod, 
        //     this.cruiseFacetsApiUrl + "?" + queryString, 
        //     filters);
        let cruiseFacetsResult: Result<Page<any>>;
        if(filters){
            return axiosService.post(this.cruiseFacetsApiUrl + "?" + queryString, filters)
            .then(result  => {
                cruiseFacetsResult = <Result<Page<any>>>result.data;
                
                if(cruiseFacetsResult.isSucceed && cruiseFacetsResult.data &&
                    cruiseFacetsResult.data.facets && cruiseFacetsResult.data.facets.length > 0){
                        //cruiseFacetsResult.data.facets = this.setFacetsData(cruiseFacetsResult.data.facets).the;
                       return this.setFacetsData(cruiseFacetsResult.data.facets).then(facetsWithData => {
                        cruiseFacetsResult.data.facets = facetsWithData;
                        return cruiseFacetsResult;
                       });                        
                }
                else {
                    return Promise.resolve(cruiseFacetsResult);
                }                
            });
        }
        else {
            return axiosService.get(this.cruiseFacetsApiUrl + "?" + queryString)
            .then(result  => {
                let cruiseFacetsResult = <Result<Page<any>>>result.data;
                
                if(cruiseFacetsResult.isSucceed && cruiseFacetsResult.data &&
                    cruiseFacetsResult.data.facets && cruiseFacetsResult.data.facets.length > 0){
                        //cruiseFacetsResult.data.facets = this.setFacetsData(cruiseFacetsResult.data.facets).the;
                       return this.setFacetsData(cruiseFacetsResult.data.facets).then(facetsWithData => {
                        cruiseFacetsResult.data.facets = facetsWithData;
                        return cruiseFacetsResult;
                       });                        
                }
                else {
                    return Promise.resolve(cruiseFacetsResult);
                } 
            });
        }        
    }
        
    setFacetsData(facets: Array<Facet>): Promise<Array<Facet>>{
        if (facets && facets.length > 0) {
            let masterTypes: Array<MasterTypes> = [
                MasterTypes.Cruiseline,
                MasterTypes.Destination,
                MasterTypes.Ship,
                MasterTypes.Port
            ];

            return masterService.getMastersAsync(masterTypes).then(masters =>{
                facets = this.setFacetsDataFromMaster(facets, masters);
                return facets;
            })
        }else{
            return Promise.resolve(facets);
        }
    }
    
    /**
     * Sets Facets Data from Master
     * @param facets 
     * @param masters 
     */
    setFacetsDataFromMaster(facets: Array<Facet>, masters: Masters): Array<Facet>{
        if (facets && facets.length > 0) {
            facets.forEach(function(facet, index, facetList){
                if (facetList[index] && facetList[index].values
                    && facetList[index].values.length > 0){

                        if(facetList[index].key === GenericParams.Cruise.cruiselineId ||
                            facetList[index].key == GenericParams.Cruise.shipId ||
                            facetList[index].key == GenericParams.Cruise.destinationId ||
                            facetList[index].key == GenericParams.Cruise.departurePortCode) {
                                facetList[index].values.forEach(
                                    function(facetValue, facetIndex, facetValues){
                                        if(facetValues[facetIndex] &&
                                        facetValues[facetIndex].value){

                                            if(facetList[index].key === 
                                                GenericParams.Cruise.cruiselineId
                                                && masters.cruiseLines && masters.cruiseLines.length > 0){

                                                    facetValues[facetIndex].contentInfo = 
                                                    <ContentBase>masters.cruiseLines.find(x=>x.id === facetValues[facetIndex].value);

                                                }
                                                else if(facetList[index].key === 
                                                    GenericParams.Cruise.shipId
                                                    && masters.ships && masters.ships.length > 0){
                                                        facetValues[facetIndex].contentInfo = 
                                                        <ContentBase>masters.ships.find(x=>x.id === facetValues[facetIndex].value);
                                                }
                                                else if(facetList[index].key ===
                                                    GenericParams.Cruise.destinationId
                                                    && masters.destinations && masters.destinations.length > 0){
                                                        facetValues[facetIndex].contentInfo =
                                                        <ContentBase>masters.destinations.find(x =>
                                                        x.id == facetValues[facetIndex].value);
                                                    }
                                                    else if ((facetList[index].key ==
                                                        GenericParams.Cruise.departurePortCode
                                                        || facetList[index].key ==
                                                        GenericParams.Cruise.arrivalPortCode)
                                                        && masters.ports && masters.ports.length > 0) {
                                                        facetValues[facetIndex].contentInfo =
                                                            <ContentBase>masters.ports.find(x =>
                                                                x.code == facetValues[facetIndex].value);
                                                    }

                                                    if (!facetValues[facetIndex].contentInfo) {
                                                        facetValues[facetIndex].contentInfo =
                                                            new ContentBase();
                                                    }
                                                    //for special case where no name is available
                                                    if (!facetValues[facetIndex].contentInfo.name) {
                                                        facetValues[facetIndex].contentInfo.name =
                                                            Constants.nameNotAvailableText;
                                                    }
                                        }                                                                             
                                    });
                                    if (facetList[index].key ==
                                        GenericParams.Cruise.destinationId) {
                                        // TODO: refector this 
                                        // Filter Destination with Id 51 as it's name is not available
                                        facetList[index].values = facetList[index].values.filter(x => x.value != 51);
                                    }

                                    // Order facets by Priority and Name                        
                        facetList[index].values.sort((a: FacetValue, b: FacetValue) => {
                            return a.contentInfo.priority == b.contentInfo.priority
                                ? a.contentInfo.name.localeCompare(b.contentInfo.name)
                                : (a.contentInfo.priority < b.contentInfo.priority ? -1 : 1)
                        });
                            }

                    }
            })
        }
        return facets;
    }
    
}
export const cruiseService = new CruiseServcie();
