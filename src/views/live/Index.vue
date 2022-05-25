<template>
  直播平台{{UserInfo.auth}}
<a-button type="dashed" v-if="UserInfo.auth">Dashed Button</a-button>
  <a-button type="primary" @click="UserInfo.auth=true">Primary Button</a-button>
  <a-button @click="UserInfo.auth=false">Default Button</a-button>
</template>

<script>
import { defineComponent } from 'vue';
import { UserInfo } from "@/plugins/Account";
export default defineComponent({
  data(){
    return {
      UserInfo
    }
  }
})
</script>

<style>

</style>