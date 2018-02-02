import Vue, { ComponentOptions } from "vue"
import App from "./App.vue"
import CruiseForm from './components/cruise/cruise-form.vue'
import vSelect from 'vue-select'
import VueCustomElement from 'vue-custom-element'


Vue.config.productionTip = false
Vue.component('v-select', vSelect)

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.ignoredElements = [
    'cruise-form'
  ]

// Enable the plugin
Vue.use(VueCustomElement)
//Register your component
Vue.customElement('cruise-form', CruiseForm)

new Vue({    
    render: h => h(App),
    // template:`<div id="Components">
    //           <div id="CruiseComponent">
    //           <cruise-form propA="I'am Property"></cruise-form>
    //           </div>       
    //           </div>`,
    //           components:{
    //             'cruise-form':CruiseForm
    //           }
}).$mount('#app')
