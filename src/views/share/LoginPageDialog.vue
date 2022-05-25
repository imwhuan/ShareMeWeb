<template>
  <div class="loginpage">
    <transition name="fade"  mode="out-in">
          <component :is="form" @loginres="WaitComRes"></component>
        </transition>
        <a-row type="flex" justify="space-around">
          <a-col>
            <a-button @click="LoginToReg" v-if="isloginform">注册</a-button>
            <a-button @click="RegToLogin" v-else>登录</a-button>
          </a-col>
        </a-row>
        <a-divider>其他{{isloginform?'登录':'注册'}}方式</a-divider>
        <a-row type="flex" justify="space-around">
          <a-col class="logo-icon">
            <github-outlined />
          </a-col>
          <a-col class="logo-icon">
            <phone-outlined/>
          </a-col>
          <a-col class="logo-icon">
            <wechat-outlined />
          </a-col>
          <a-col class="logo-icon">
            <qq-outlined />
          </a-col>
          <a-col class="logo-icon">
            <dingding-outlined />
          </a-col>
          <a-col class="logo-icon">
            <weibo-circle-outlined />
          </a-col>
        </a-row>
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import RegisterFormPhone from '@/components/login/RegisterFormPhone.vue'
import LoginFormPhoneCode from '@/components/login/LoginFormPhoneCode.vue'
import { defineComponent} from 'vue';
import { message,notification } from 'ant-design-vue';

import {
  GithubOutlined,PhoneOutlined,WechatOutlined,QqOutlined,DingdingOutlined,WeiboCircleOutlined} from '@ant-design/icons-vue';
export default defineComponent({
  emits:{
    //本页面动作完成，通知调用方可以关闭dialog
    dialogfinish:null
  },
    components:{
        LoginForm,LoginFormPhoneCode,RegisterForm,RegisterFormPhone,
        GithubOutlined,PhoneOutlined,WechatOutlined,QqOutlined,DingdingOutlined,WeiboCircleOutlined
    },
    data(){
      return {
        form:'LoginFormPhoneCode',
        isloginform:true,
      }
    },
    methods:{
      RegToLogin(){
        this.form='LoginFormPhoneCode',
        this.isloginform=true
      },
      LoginToReg(){
        this.form='RegisterFormPhone',
        this.isloginform=false
      },
      /**
       * 组件返回结果
       * @param res {number} 返回结果：10登录成功，11登录失败，20注册成功，21注册失败
       * @param msg {string} 返回消息
       */
      WaitComRes(res:number,msg:string){
        console.log("父亲收到反馈结果",res,msg)
        switch(res){
          case 10:
            message.success(msg)
            this.$emit("dialogfinish",true)
            break;
          case 11:message.error(msg);break;
          case 20:
            this.RegToLogin()
            notification.success({message:"请登录哦~",description:msg,duration:10})
            break;
          case 21:
            notification.error({message:"注册失败！",description:msg,duration:20});
            break;
        }
      }
    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.loginpage{
  height: 100%;
  position: relative;
}
/* .loginpage>.loginbgpanel{
  width: 100%;
  height: 100%;
  position: absolute;
  background-position: center;
  filter: blur(2px);
  background-repeat: no-repeat;
  background-size: cover;
} 
.loginpage .formpanel{
  background-color: rgba(255,255,255,.4);
  padding: 20px;
  border-radius: 10px;
}*/
.logo-icon{
   font-size: 24px;
   cursor: pointer;
   color: gray;
   transition: transform .5s;
}
.logo-icon:hover{
  transform: scale(1.5);
}
</style>