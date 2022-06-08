<template>
  <a-result :title="welcome_world">
    <template #icon>
      <smile-twoTone />
    </template>
    <template #extra>
      <a-button type="primary" @click="toLogin">去登录</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { SmileTwoTone } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
      return {
        welcome_world:"*/+-",
      }
    },
    methods:{
        toLogin(){
            //this.$router.push('/login')
            this.$router.push('/home')
        }
    },
    mounted(){
      this.welcome_world=sessionStorage.getItem("web-welcome")??"你好啊 旅行者，欢迎使用SharMe平台~"
    },
  components: {
    SmileTwoTone
  },
});
</script>