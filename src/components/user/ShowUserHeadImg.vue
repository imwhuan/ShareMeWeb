<template>
  <a-row type="flex" justify="center" align="bottom">
    <a-col :span="20" style="text-align: center">
      <a-space direction="vertical">
        <a-avatar v-if="global.uheadimg" shape="square" :src="global.uheadimg" :size="{ xs: 24, sm: 40, md: 60, lg: 80, xl: 120 }"/>
        <a-avatar v-else shape="square" :size="{ xs: 24, sm: 40, md: 60, lg: 80, xl: 120}">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-button @click="croppervisible=true">更换头像</a-button>
      </a-space>
    </a-col>
  </a-row>
  <a-row type="flex" justify="space-around" align="top">
    <a-col :sm="24" :md="16" :lg="11">
      <a-divider orientation="left">选择头像</a-divider>
      <a-card title="会员专属">
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="16" :lg="11">
      <a-divider orientation="left">选择头像框</a-divider>
      <a-card title="会员专属">
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">Content</a-card-grid>
      </a-card>
    </a-col>
  </a-row>
  <a-modal v-model:visible="croppervisible" title="上传头像" width="60%" :footer="null">
    <head-img-cropper :Name="1" @uploadfinish="changefinish"></head-img-cropper>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import GlobalData from "@/plugins/GlobalData";
import HeadImgCropper from '@/components/editor/HeadImgCropper.vue'
import { UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  data(){
    return{
      global:ref(GlobalData),
      croppervisible:ref(false)
    }
  },
  components:{
    HeadImgCropper,UserOutlined
  },
  methods:{
    changefinish(){
      this.croppervisible=false;
    }
  }
})
</script>

<style>

</style>