<template>
<div id="Components">
    <div>      
      <cruise-form></cruise-form>
    </div>       
</div>
</template>

<script lang="ts">
import Vue from 'Vue';
//import component from "vue-class-component";
import {Component} from "vue-property-decorator";
import CruiseForm from './components/cruise/cruise-form.vue';
//import Air from './components/air/air-form.vue';
//import Hotel from './components/hotel/hotel-form.vue';

@Component({
  components: {'cruise-form':CruiseForm}
})
export default class App extends Vue{   
    
  }
</script>

<style>
</style>