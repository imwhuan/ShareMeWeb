<template>
  <show-base-user-info v-if="showpanel" @switch="showpanel=!showpanel"></show-base-user-info>
  <edit-base-user-info v-else  @switch="showpanel=!showpanel"></edit-base-user-info>
</template>

<script>
import { defineComponent } from 'vue';
import ShowBaseUserInfo from '@/components/user/ShowBaseUserInfo.vue'
import EditBaseUserInfo from '@/components/user/EditBaseUserInfo.vue'
export default defineComponent({
  components:{
    ShowBaseUserInfo,EditBaseUserInfo
  },
  data(){
    return {
      showpanel:true
    }
  },
  methods:{
    switchPanel(){
      console.log("this.showpanel",this.showpanel)
      this.showpanel=!this.showpanel;
      console.log("this.showpanel",this.showpanel)
    }
  }
})
</script>

<style>

</style>