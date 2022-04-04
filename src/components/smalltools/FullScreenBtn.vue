<template>
    <a-button type="text" shape="circle" v-show="!full" @click="launchFullscreen" title="全屏">
        <template #icon><expand-outlined /></template>
    </a-button>
    <a-button type="text" shape="circle" v-show="full" @click="exitFullscreen" title="关闭全屏">
        <template #icon><compress-outlined /></template>
    </a-button>
  <!-- <expand-outlined v-show="!full" @click="full=!full"/>
  <compress-outlined  v-show="full" @click="full=!full"/> -->
</template>

<script>
import { ExpandOutlined,CompressOutlined  } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        ExpandOutlined,CompressOutlined
    },
    data(){
      return {
        full:false
      }
    },
    methods:{
      launchFullscreen() {
        document.documentElement
        if(document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
          this.full=true;
        } else if(document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
          this.full=true;
        } else if(document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
          this.full=true;
        } else if(document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
          this.full=true;
        }else{
          message.error('浏览器不支持全屏接口哦~😭');
        }
      },
      exitFullscreen() {
        if(document.exitFullscreen) {
          document.exitFullscreen();
          this.full=false;
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          this.full=false;
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          this.full=false;
        }else{
          message.error('浏览器不支持退出全屏接口哦~😭');
        }
      }
    }
})
</script>

<style>

</style>