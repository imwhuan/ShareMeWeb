<template>
<content-layout>
  <template #header>
    <station-header></station-header>
  </template>
  <template #body>
<a-tabs v-model:activeKey="activeTab" tab-position="left">
    <a-tab-pane key="1" tab="个人资料">
      <base-user-info></base-user-info>
    </a-tab-pane>
    <a-tab-pane key="2" tab="用户头像">
      <user-head-img></user-head-img>
    </a-tab-pane>
    <a-tab-pane key="3" tab="积分充值">
      <account-points></account-points>
    </a-tab-pane>
    <a-tab-pane key="4" tab="头像裁剪">
      <head-img-cropper :Name="'file'"></head-img-cropper>
    </a-tab-pane>
    <a-tab-pane key="5" tab="更换头像">
      <show-user-head-img></show-user-head-img>
    </a-tab-pane>
  </a-tabs>
    </template>
</content-layout>
</template>

<script>
import { defineComponent,ref} from 'vue';
import BaseUserInfo from '@/components/user/BaseUserInfo.vue'
import AccountPoints from '@/components/user/AccountPoints.vue'
import UserHeadImg from '@/components/user/UserHeadImg.vue'
import ContentLayout from '@/components/layout/ContentLayout.vue'
import StationHeader from '@/components/home/StationHeader.vue'
import HeadImgCropper from '@/components/editor/HeadImgCropper.vue'
import ShowUserHeadImg from '@/components/user/ShowUserHeadImg.vue'
export default defineComponent({
  data(){
    return{
      activeTab:ref('1')
    }
  },
  components:{
    BaseUserInfo,AccountPoints,ContentLayout,StationHeader,UserHeadImg,HeadImgCropper,ShowUserHeadImg
  }
})
</script>

<style>

</style>