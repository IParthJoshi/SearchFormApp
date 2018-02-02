import Vue from "vue"
import component from "vue-class-component"
import { Component, Prop, Watch } from "vue-property-decorator"
import  CruiseForm from "../../cruise/cruise-form.vue"
import  AirForm from "../../air/air-form.vue"

@component({
    components: {
      'cruise-form': CruiseForm,
      'air-form':AirForm
      }    
  })
export default class Emerald extends Vue{
  @Prop() searchType: String;
}