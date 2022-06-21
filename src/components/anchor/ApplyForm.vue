<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="申请人">
      <span class="ant-form-text">{{global.uname}}</span>
    </a-form-item>

    <a-form-item
      label="申请原因"
      name="describe"
      :rules="[{ required: true, message: '请描述你的申请原因!' }]"
    >
      <a-textarea v-model:value="formState.describe" placeholder="请做出简单的自我介绍，描述你此次申请成为主播原因或目的，这将成为管理员审批的重要参考依据"/>
    </a-form-item>

    <a-form-item
      label="申请主播类型"
      name="anchorType"
      :rules="[{ validator:validateAnchorType }]"
    >
      <a-radio-group v-model:value="formState.anchorType" button-style="solid">
        <a-radio-button :value="1">颜值主播</a-radio-button>
        <a-radio-button :value="2">游戏主播</a-radio-button>
        <a-radio-button :value="3">舞蹈主播</a-radio-button>
        <a-radio-button :value="4">搞笑主播</a-radio-button>
        <a-radio-button :value="5">综合主播</a-radio-button>
        <a-radio-button :value="6">其他
          <a-input v-if="formState.anchorType === 6" v-model:value="DiyAnchorType" @change="diyAnchorTypeChange" placeholder="自定义类型" style="width: 100px; margin-left: 10px" />
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="上传身份证件">
      <a-space>
        <a-form-item name="iDCardImgBefore" validateTrigger="submit" :rules="[{ required: true, message: '请上传身份证件照!' }]" extra="国徽面证件图片" >
          <a-upload
            v-model:file-list="iDCardImgBefore"
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :headers="upheader"
            :show-upload-list="false"
            :action="upimgurl"
            :before-upload="beforeUpload"
            :maxCount="1"
            :data="{'side':1}"
            @change="handleChange($event,1)"
          >
            <a-avatar v-if="formState.iDCardImgBefore" shape="square" :src="formState.iDCardImgBefore" style="width:100%;height:100%;"/>
            <div v-else>
              <loading-outlined v-if="iDCardImgBeforeLoading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item name="iDCardImgBehind" validateTrigger="submit" :rules="[{ required: true, message: '请上传身份证件照!' }]" extra="人像面证件图片">
          <a-upload
            v-model:file-list="iDCardImgBehind"
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :headers="upheader"
            :show-upload-list="false"
            :action="upimgurl"
            :before-upload="beforeUpload"
            :maxCount="1"
            :data="{'side':2}"
            @change="handleChange($event,2)"
          >
            <a-avatar v-if="formState.iDCardImgBehind" shape="square" :src="formState.iDCardImgBehind" style="width:100%;height:100%;"/>
            <div v-else>
              <loading-outlined v-if="iDCardImgBehindLoading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-space>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-space>
        <a-button :loading="submitLoading" type="primary" html-type="submit">提交</a-button>
        <a-button html-type="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive,ref } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam} from 'ant-design-vue';//, UploadProps 
import GlobalData from "@/plugins/GlobalData";
import { message,notification } from 'ant-design-vue';
import {GetPostIDCardImgUrl} from '@/http/GetHttpUrl'
import { GetUserToken } from "@/plugins/UseLocalDB";
import type { AnchorApplyModel } from '@/http/ShareMeServerModel'
import { PostApply } from '@/http/HttpAnchorApplyServer'

// interface FormState {
//   describe: string;
//   iDCardImgBefore: string;
//   iDCardImgBehind: string;
//   anchorType: number;
//   anchorTypeDesc: string;
// }
export default defineComponent({
  components:{
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const iDCardImgBefore = ref([]);
    const iDCardImgBehind = ref([]);
    const iDCardImgBeforeLoading = ref<boolean>(false);   
    const iDCardImgBehindLoading = ref<boolean>(false);   
    const upheader={
      'Authorization':'Bearer '+GetUserToken(),
    }

    const submitLoading= ref(false);
    const upimgurl=GetPostIDCardImgUrl()
    const global=ref(GlobalData)
    //console.log("global",GlobalData,global)
    const DiyAnchorType=ref('')
    const formState = reactive<AnchorApplyModel>({
      describe: '',
      iDCardImgBefore: '',
      iDCardImgBehind: '',
      anchorType: 0,
      anchorTypeDesc:''
    });
    const onFinish = (values: any) => {
      submitLoading.value=true
      console.log('Success:', values);
      PostApply(formState).then(val=>{
        console.log("申请结果",val)
        if(val.success){
          message.success(val.data?'申请成功！回执编号为：'+val.data.id:'申请成功！')
          submitLoading.value=false;
        }else{
          submitLoading.value=false;
          notification.error({message:"申请失败！",description:val.message?val.message:'未返回错误信息',duration:0})
        }
      }).catch(err=>{
        submitLoading.value=false;
        console.log("错误",err)
        notification.error({message:"申请请求发生错误！",description:err.message,duration:0})
      })
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      message.error("提交失败")
    };
    const validateAnchorType=async (_rule:any, value:number) => {
      if (value >0) {
        if(value==6&&DiyAnchorType.value==''){
          console.log("DiyAnchorType",DiyAnchorType,DiyAnchorType.value)
          return Promise.reject('请填写自定义主播类型！');
        }
        formState.anchorTypeDesc=DiyAnchorType.value;
       return Promise.resolve();
      } else {
        return Promise.reject('请选择主播类型！');
      }
    };
    const diyAnchorTypeChange=()=>{
      formRef.value.validateFields('anchorType');
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
    const handleChange = (info: UploadChangeParam,side:number) => {
      if (info.file.status === 'uploading') {
        if(side==1){
          iDCardImgBeforeLoading.value = true;
        }else{
          iDCardImgBehindLoading.value = true;
        }
        message.loading("正在上传")
        return;
      }
      else if (info.file.status === 'done') {
        message.success("上传成功")
        
        if(info.file.response){
          if(info.file.response.data){
            if(side==1){
              //console.log("iDCardImgBefore",iDCardImgBefore,iDCardImgBefore.value)
              formState.iDCardImgBefore=info.file.response.data
              formRef.value.validateFields('iDCardImgBefore');
            }else{
              formState.iDCardImgBehind=info.file.response.data
              formRef.value.validateFields('iDCardImgBehind');
            }
            return
          }
        }
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, (base64Url: string) => {
        //   imageUrl.value = base64Url;
        //   loading.value = false;
        // });
      }
      else if (info.file.status === 'error') {
        if(side==1){
          iDCardImgBeforeLoading.value = false;
        }else{
          iDCardImgBehindLoading.value = false;
        }
        console.log("错误信息",info)
        message.error('上传图片出错！');
        if(info.file.response){
          if(info.file.response.message){
            notification.error({message:"上传图片出错！",description:info.file.response.message})
          }
        }
      }
    };
    return {
      global,
      upimgurl,
      upheader,
      iDCardImgBeforeLoading,
      iDCardImgBehindLoading,
      iDCardImgBefore,
      iDCardImgBehind,
      formRef,
      formState,
      DiyAnchorType,
      submitLoading,
      validateAnchorType,
      diyAnchorTypeChange,
      onFinish,
      onFinishFailed,
      beforeUpload,
      handleChange
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