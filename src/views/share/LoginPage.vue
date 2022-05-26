<template>
  <div class="loginpage">
    <div class="loginbgpanel" :style="{ backgroundImage: 'url('+bgimg+')'}"></div>
    <a-row type="flex" justify="center" align="middle" style="height:100%;">
      <a-col :xs="20" :sm="14" :md="10" :lg="7" class="formpanel">
        <transition name="fade"  mode="out-in">
          <component :is="form"></component>
        </transition>
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-button @click="Index">首页</a-button>
          </a-col>
          <a-col>
            <a-button @click="About">关于</a-button>
          </a-col>
          <a-col>
            <a-button @click="NoLogin">游客</a-button>
          </a-col>
          <a-col>
            <a-button @click="form='LoginForm'" v-if="form=='RegisterForm'">登录</a-button>
            <a-button @click="form='RegisterForm'" v-else>注册</a-button>
          </a-col>
        </a-row>
        <a-divider>其他登录方式</a-divider>
        <a-row type="flex" justify="space-around">
          <a-col class="logo-icon">
            <github-outlined />
          </a-col>
          <a-col class="logo-icon">
            <twitter-outlined />
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
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import {GetImageUrl} from '@/http/GetHttpUrl'
import { defineComponent} from 'vue';

import {
  GithubOutlined,TwitterOutlined,WechatOutlined,QqOutlined,DingdingOutlined,WeiboCircleOutlined} from '@ant-design/icons-vue';
export default defineComponent({
    components:{
        LoginForm,RegisterForm,
        GithubOutlined,TwitterOutlined,WechatOutlined,QqOutlined,DingdingOutlined,WeiboCircleOutlined
    },
    data(){
      return {
        form:'LoginForm',
        bgimg:GetImageUrl('few50.jpeg')
      }
    },
    methods:{
      Index(){
        this.$router.push('/')
      },
      About(){
        this.$router.push('/about')
      },
      NoLogin(){
        this.$router.replace({name:'Home'})
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
}
.loginpage>.loginbgpanel{
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
}
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