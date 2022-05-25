<template>
  <a-form
    ref="formRef"
    :model="formModel"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    labelAlign='left'
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="手机号"
      name="account"
      :rules="[{ required: true, message: '请输入手机号!' }]"
    >
      <a-input v-model:value="formModel.account" placeholder="请输入手机号"/>
    </a-form-item>

    <a-form-item
      label="验证码"
      name="code"
      :rules="[{ required: true, message: '请输入验证码!' }]"
    >
    <a-space>
      <a-input v-model:value="formModel.code" placeholder="请输入验证码"/>
      <a-button :loading="sendCodeLoading" :disabled="sendCodeDisabled" @click="sendCode">{{60>sendCodeNum? '发送验证码('+ sendCodeNum+')':'发送验证码'}}</a-button>
    </a-space>
      
    </a-form-item>

  <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formModel.password" placeholder="请输入密码"/>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button :loading="submitLoading" type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive,ref,getCurrentInstance } from 'vue';
import { RegisterSendVertifyCode,Register } from '@/http/HttpAccountServer'
import type {ShareMeRegistModel } from "@/http/ShareMeServerModel";
import { notification,message } from 'ant-design-vue';

export default defineComponent({
  emits:{
    loginres:null
  },
  setup() {
    const formRef = ref();
    const sendCodeLoading= ref(false);
    const submitLoading= ref(false);
    const sendCodeDisabled=ref(false);
    const sendCodeNum=ref(60);
    const formModel = reactive<ShareMeRegistModel>({
      accountType:1,
      account: '',
      code:'',
      password: '',
      name:'',
      remember:false
    });
    const instance=getCurrentInstance()
    const onFinish = (values: any) => {
      console.log('Success:', values);
      Register(formModel).then(val=>{
        console.log("注册结果",val)
        if(val.success){
          message.success(val.data?'注册成功！'+val.data:'注册成功！')
          instance?.emit("loginres",20,"注册成功！")
          submitLoading.value=false;
        }else{
          submitLoading.value=false;
          notification.error({message:"注册失败！",description:val.message?val.message:'未返回错误信息',duration:0})
          instance?.emit("loginres",21,val.message)
        }
      }).catch(err=>{
        submitLoading.value=false;
        console.log("错误",err)
        notification.error({message:"注册请求发生错误！",description:err.message,duration:0})
        instance?.emit("loginres",21,err.message)
      })
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const sendCode=()=>{
      formRef.value.validateFields('account').then(()=>{
        sendCodeLoading.value=true;
        RegisterSendVertifyCode(formModel).then(val=>{
          if(val.success){
            message.success(val.data?'验证码发送成功！'+val.data:'验证码发送成功！')
            sendCodeLoading.value=false;
            sendCodeDisabled.value=true;
            sendCodeNum.value=60
            const timer=setInterval(()=>{
              sendCodeNum.value--;

              if(sendCodeNum.value<0){
                sendCodeDisabled.value=false;
                clearInterval(timer)
                sendCodeNum.value=60
              }
            },1000)
          }else{
            sendCodeLoading.value=false;
            notification.error({message:"验证码发送错误！",description:val.message?val.message:'未返回错误信息',duration:0})
          }
          
        }).catch(err=>{
          sendCodeLoading.value=false;
          console.log("错误",err)
          notification.error({message:"验证码发送错误！",description:err.message,duration:0})
        })
      }).catch(()=>{
        message.error("请输入正确的手机号")
      });
      
    }
    return {
      formModel,sendCodeLoading,sendCodeDisabled,sendCodeNum,formRef,submitLoading,
      onFinish,
      onFinishFailed,sendCode
    };
  },
});
</script>

