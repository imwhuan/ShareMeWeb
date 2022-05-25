<template>
  <a-result :title="welcome_world">
    <template #icon>
      <smile-twoTone />
    </template>
    <template #extra>
      <a-button type="primary" @click="toLogin">去登录</a-button>
    </template>
  </a-result>
  <a-modal v-model:visible="loginvisible" title="登录" :footer="null">
    <div class="loginbgpanel" :style="{ backgroundImage: 'url('+bgimg+')'}"></div>
      <login-page-dialog></login-page-dialog>
    </a-modal>
</template>
<script lang="ts">
import { SmileTwoTone } from '@ant-design/icons-vue';
import { defineComponent,ref } from 'vue';
import LoginPageDialog from '@/views/share/LoginPageDialog.vue'
import {GetImageUrl} from '@/http/ShareMeServer'

export default defineComponent({
    data(){
      return {
        welcome_world:"*/+-",
        loginvisible:ref(false),
        bgimg:GetImageUrl('few50.jpeg')
      }
    },
    methods:{
        toLogin(){
            this.$router.push('/login')
            //this.loginvisible=true
        }
    },
    mounted(){
      this.welcome_world=sessionStorage.getItem("web-welcome")??"*/+-"
    },
  components: {
    SmileTwoTone,LoginPageDialog
  },
});
</script>