import Vue from "vue";
//import component from "vue-class-component";
import {Component, Prop, Watch } from "vue-property-decorator";

import { axiosInstance } from "../../config/httpClient/axios-config";
import { masterService }  from '../../services/shared/master.service';

@Component
export default class CruiseForm extends Vue{
    //For holding api returned data
    facetsData: any;
    destinations: Array<any> = new Array<any>();
    cruiseLines: Array<any> = new Array<any>();
    ships: Array<any> = new Array<any>();
    departurePorts: Array<any> = new Array<any>();

    //Redfined array for displaying to client
    destinationList: Array<any> = new Array<any>();
    cruiseLineList: Array<any> = new Array<any>();
    shipList: Array<any> = new Array<any>();
    departurePortList: Array<any> = new Array<any>();
    durationList: Array<any> = Array<any>();
    sailingDateList: Array<any> = Array<any>();

    //array for holding values selected by client
    selectedDestinations: Array<any> = new Array<any>();
    selectedCruiseLines: Array<any> = new Array<any>();
    selectedCruiseShips: Array<any> = new Array<any>();
    selectedDeparturePorts: Array<any> = new Array<any>();
    selectedDuration: Array<any> = new Array<any>();
    selectedSailingDate: any = null;

    /**
     * lifecycle hook - called when component is created
     */
    created() {
        this.initializeData();
    }

    
    initializeData() {
        this.getMasterData();
        this.getFacets();
    }

    //to call all master api to get initial data
    getMasterData(): void {

        masterService.getMasters().then(res=>{
            debugger;
            this.destinations = res.destinations;
        }).catch(e => {
            console.log(e);
        })

        axiosInstance.get('master/all/cruiseline')
        .then(response => {            
            this.cruiseLines = response.data.data;
        })
        .catch(e => {
            console.log(e);
        })

        axiosInstance.get('master/all/ship')
        .then(response => {
            this.ships = response.data.data;
        })
        .catch(e => {
            console.log(e);
        })

        axiosInstance.get('master/all/port')
        .then(response => {
            this.departurePorts = response.data.data;
        })
    }

    //to call faceta api
    getFacets() {
        axiosInstance.get('cruise/facets')
        .then(response => {
            this.facetsData = response.data.data;
        })
        .then( () => {          
            this.setDataFromFacests()
        })
    }

    //to refine data according to client selection
    setDataFromFacests(): void {
        // console.log(this.facetsData);
        if (this.facetsData != null) {       
            this.facetsData.facets.forEach( (element: any) => {                
                let i = 0;
                if (element.key === "duration") {
                    i = 0;
                    element.values.forEach( (duration: any) => {
                        if (duration.to != undefined) {
                            let durationData = {
                                id: duration.from + " To " + duration.to,
                                name: duration.from + " To " + duration.to
                            }
                            this.durationList.push(durationData);                           
                        } else {
                            let durationData = {
                                id: duration.from + " and More",
                                name: duration.from + " and More"
                            }
                            this.durationList.push(durationData);
                        }
                        i++;
                    });
                }

                if (element.key === "departureDateTime") {
                    i = 0;
                    element.values.forEach( (sailingDate: any) => {
                        let dateString = JSON.stringify(sailingDate.from).split('-');
                        dateString[dateString.length - 1] = dateString[dateString.length - 1].slice(0, -1);
                        let sailingDateData = {
                            id: dateString[1] + ' ' + dateString[2],
                            name: dateString[1] + ' ' + dateString[2]
                        }
                        this.sailingDateList.push(sailingDateData);
                        i++;
                    });
                }

                if (element.key === "destinationId") {
                    element.values.forEach( (element: any) => {
                        this.destinations.forEach( (destination) => {
                            if (destination.id == element.value) {
                                this.destinationList.push(destination);
                            }
                        })
                    });
                    // this.destinationList.sort( (a, b) => a.name.localeCompare(b.name));
                    this.sortArray(this.destinationList);
                }

                if (element.key === "departurePortCode") {
                    element.values.forEach( (element: any) => {
                        this.departurePorts.forEach( (port) => {
                            if (port.code == element.value) {
                                this.departurePortList.push(port);
                            }
                        })
                    });
                    // this.departurePortList.sort( (a, b) => a.name.localeCompare(b.name));
                    this.sortArray(this.departurePortList);
                }

                if (element.key === "cruiselineId") {
                    element.values.forEach( (element: any) => {
                        this.cruiseLines.forEach( (cruiseLine) => {
                            if (cruiseLine.id == element.value) {
                                this.cruiseLineList.push(cruiseLine);
                            }
                        })
                    });
                    // this.cruiseLineList.sort( (a, b) => a.name.localeCompare(b.name));
                    this.sortArray(this.cruiseLineList);
                }

                if (element.key === "shipId") {
                    element.values.forEach( (element: any) => {
                        this.ships.forEach( (ship) => {
                            if (ship.id == element.value) {
                                this.shipList.push(ship);
                            }
                        })
                    });
                    // this.shipList.sort( (a, b) => a.name.localeCompare(b.name));
                    this.sortArray(this.shipList);
                }

            });
        }
    }

    sortArray(array: Array<any>): void {
        array.sort( (a, b) => a.name.localeCompare(b.name));
    }

    //for testing th selected data
    displayData(): void {
        // console.log('Destination data : ' + JSON.stringify(this.shipList));
        // console.log("Duration : " + JSON.stringify(this.durationList));
        // console.log("Prop : " + this.name);
    }
}