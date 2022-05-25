<template>
  <user-login-panel v-if="logined" @afterloginout="logined=false"></user-login-panel>

  <user-no-login-panel v-else @afterlogin="logined=true"></user-no-login-panel>
</template>

<script>
import UserLoginPanel from '@/components/smalltools/UserLoginPanel.vue'
import UserNoLoginPanel from '@/components/smalltools/UserNoLoginPanel.vue'
import { defineComponent } from 'vue';
import {GetUserToken} from '@/plugins/UseLocalDB'
export default defineComponent({
  components:{
    UserLoginPanel,UserNoLoginPanel
  },
  data(){
    return{
      logined:false
    }
  },
  mounted(){
    if(GetUserToken()){
      this.logined=true
    }else{
      this.logined=false
    }
  }
})
</script>

<style>

</style>