import Vue from "vue";
import component from "vue-class-component";
import {Component, Prop, Watch } from "vue-property-decorator";
import { createDecorator } from "vue-class-component/lib/util";

@Component
export default class CruiseForm extends Vue{
    msg: string = "Vue in Typescript!"
    @Prop() propA : string
    
    created(){
        console.log("prop :", this.propA);
    }
}