<template>
  <a-popover placement="bottom">
    <template #content>
      <a-card style="width: 300px">
        <template #cover>
          <img
            alt="example"
            :src="bgimg"
          />
        </template>
        <template #actions>
          <a-button type="text" @click="showlogin">
            <template #icon>
            <login-outlined />
            </template> 登录</a-button>
          <user-outlined />
          <a-button type="text">
            <template #icon>
            <import-outlined />
            </template> 反馈</a-button>
        </template>
        <a-card-meta title="登录获取丰富特权🕊️" description="开启包括弹幕、留言、互动、收藏、下载等多项权益😄">
          <!-- <template #avatar>
            <a-avatar>
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </template> -->
        </a-card-meta>
      </a-card>
    </template>
    <a-avatar style="background-color: #87d068">登录</a-avatar>
  </a-popover>

  <a-modal v-model:visible="loginvisible" title="登录" :footer="null">
    <div class="loginbgpanel" :style="{ backgroundImage: 'url('+bgimg+')'}"></div>
      <login-page-dialog @dialogfinish="loginFinish($event)"></login-page-dialog>
    </a-modal>
</template>

<script lang="ts">
import { LoginOutlined,UserOutlined,ImportOutlined } from '@ant-design/icons-vue';
import { defineComponent,ref } from 'vue';
import LoginPageDialog from '@/views/share/LoginPageDialog.vue'
import {GetImageUrl} from '@/http/GetHttpUrl'

export default defineComponent({
  emits:{
    afterlogin:null
  },
  data(){
    return{
      loginvisible:ref(false),
      bgimg:GetImageUrl('few50.jpeg')
    }
  },
  methods:{
    showlogin(){
      this.loginvisible=true;
    },
    loginFinish(){
      this.loginvisible=false;
      this.$emit('afterlogin')
    }
  },
  // setup(){
  //   const user=ref(UserInfo);
  //   const loginvisible=ref(false)

  //   const showlogin=()=>{
  //     loginvisible.value=true;
  //   };
  //   const loginFinish=function(res){
  //     console.log("登录完成",res)
  //     loginvisible.value=false;
  //     if(res){
  //       user.value.auth=true;
        
  //     }
  //   }
  //   const bgimg=GetImageUrl('few40.jpeg')
  //   return{
  //     user,loginvisible,showlogin,loginFinish,bgimg
  //   }
  // },
  components:{
        UserOutlined,LoginOutlined,ImportOutlined,LoginPageDialog
    },
    // methods:{
    //   login(){
    //     this.loginvisible=true
    //     console.log(this.user)
    //     this.user.auth=true;
    //   },
    //   loginout(){
    //     console.log(this.user)
    //     this.user.auth=false
    //   }
    // },
    // data(){
    //   return{
    //     user:ref(UserInfo),
    //     loginvisible:ref(false)
    //   }
    // }
})
</script>


<style scoped>
.loginbgpanel{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  background-position: center;
  filter: blur(2px);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>