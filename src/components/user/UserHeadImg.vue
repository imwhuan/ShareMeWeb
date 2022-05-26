<template>
<a-row type="flex" justify="center" align="bottom">
    <a-col :span="20" style="text-align: center">
      <a-upload
        v-model:file-list="fileList"
        name="file"
        list-type="picture-card"
        class="avatar-uploader"
        :headers="upheader"
        :show-upload-list="false"
        :action="upimgurl"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <a-avatar v-if="global.uheadimg" shape="square" :src="global.uheadimg" style="width:100%;height:100%;"/>
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
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
</template>
<script lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import type { UploadChangeParam} from 'ant-design-vue';//, UploadProps 
import { message,notification } from 'ant-design-vue';
import {GetUpHeadImgUrl} from '@/http/GetHttpUrl'
import { GetUserToken,UpdateUserHeadImg } from "@/plugins/UseLocalDB";
import { GlobalData } from "@/plugins/GlobalData";

// function getBase64(img: Blob|any, callback: (base64Url: string) => void) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// }
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const global=ref(GlobalData)
    const fileList = ref([]);
    const loading = ref<boolean>(false);
    //const imageUrl = ref<string>('');
    //imageUrl.value=global.value.uheadimg;
    const upimgurl=GetUpHeadImgUrl();
    const upheader={
      'Authorization':'Bearer '+GetUserToken(),
    }

    // const customUploadFunc:UploadProps['customRequest']=(option)=>{
    //   console.log("上传的文件",option)
    //   setTimeout(()=>{
    //     option.onSuccess("上传完成了",option)
    //   },6000)
    //   let i=0;
    //   const timer= setInterval(()=>{
    //     i=i+1;
    //     if(i>100){
    //       clearInterval(timer)
    //     }
    //     option.onProgress({percent:i})
    //   },400)
    // }

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        message.loading("正在上传")
        return;
      }
      if (info.file.status === 'done') {
        message.success("上传成功")
        if(info.file.response){
          if(info.file.response.data){
            const uimg=UpdateUserHeadImg(info.file.response.data)
            console.log("获取到图片",uimg)
            //imageUrl.value=GetImageUrl(uimg)
            return
          }
        }
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, (base64Url: string) => {
        //   imageUrl.value = base64Url;
        //   loading.value = false;
        // });
      }
      if (info.file.status === 'error') {
        loading.value = false;
        console.log("错误信息",info)
        message.error('上传图片出错！');
        if(info.file.response){
          if(info.file.response.message){
            notification.error({message:"上传图片出错！",description:info.file.response.message})
          }
        }
      }
    };

    const beforeUpload = (file:any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };

    return {
      fileList,
      loading,
      //imageUrl,
      global,
      upimgurl,
      handleChange,
      beforeUpload,
      //customUploadFunc,
      upheader
    };
  },
});
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
