import Vue from "vue";
// import component from "vue-class-component";
import { Component, Prop, Watch } from "vue-property-decorator";
import  CruiseForm from "../cruise/cruise-form.vue";
import  AirForm from "../air/air-form.vue";

import Emerald from "./emerald/emerald.vue"
import Apricot from "./apricot/apricot.vue"

@Component({
    components: {
        'emerald':Emerald,
        'apricot': Apricot
    }    
  })
export default class Template extends Vue{    
    @Prop() templateName: String;
    @Prop() searchType: String;
}