<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    :labelCol="{span: 8}"
    labelAlign='left'
    @finish="handleFinish"
  >
  
    <a-form-item has-feedback label="名称" name="Name">
      <a-input v-model:value="formState.Name">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item has-feedback label="密码" name="Password">
      <a-input-password v-model:value="formState.Password">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item has-feedback label="确认密码" name="checkPwd">
      <a-input-password v-model:value="formState.checkPwd" autocomplete="off">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input-password>
    </a-form-item>
    <!-- <a-form-item name="sex" label="性别">
      <a-radio-group v-model:value="formState.sex">
        <a-radio-button value="0">保密</a-radio-button>
        <a-radio-button value="1">帅哥</a-radio-button>
        <a-radio-button value="2">美女</a-radio-button>
      </a-radio-group>
    </a-form-item> -->
    <a-form-item>
      <a-button type="primary" :loading="logining" html-type="submit" style="width: 100%;">注册</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { Register } from '@/http/ShareMeServer'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
        Name:'',
        Password: '',
        checkPwd: ''
    });
    const logining=ref(false)
    let validateUserName=async (_rule:any, value:string) => {
      if (value === '') {
        return Promise.reject('请输入用户名！');
      } else {
        if (value.length>10) {
          return Promise.reject('用户名不能超过10位！');
        }
        return Promise.resolve();
      }
    };

    let validatePass = async (_rule:any, value:string) => {
      if (value === '') {
        return Promise.reject('请输入密码！');
      } else {
        if (formState.checkPwd !== '') {
          formRef.value.validateFields('checkPass');
        }
        return Promise.resolve();
      }
    };

    let validatePass2 = async (_rule:any, value:string) => {
      if (value === '') {
        return Promise.reject('请再次输入密码！');
      } else if (value !== formState.Password) {
        return Promise.reject("两次密码不一致！");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      Name: [{
        required: true,
        validator: validateUserName,
        trigger: 'change',
      }],
      Password: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      checkPwd: [{
        validator: validatePass2,
        trigger: 'change',
      }]
    };

    const handleFinish = () => {
      logining.value=true
      const msgkey='msgkey'
      message.loading({ content: 'Loading...',key: msgkey,duration:0 });
      Register(formState.Name,formState.Password).then(res=>{
        message.success({ content: "注册成功！"+res.data,key: msgkey })
        logining.value=false
      }).catch(err=>{
        message.error({ content: "注册失败！"+err.message,key: msgkey })
        logining.value=false
      })
      //console.log("成功",values, formState);
    };

    // const handleFinishFailed = errors => {
    //   message.error('信息填写错！');
    //   console.log("错误",errors);
    // };

    // const resetForm = () => {
    //   formRef.value.resetFields();
    // };

    // const handleValidate = (...args) => {
    //   console.log(args);
    // };

    return {
      formState,
      logining,
      formRef,
      rules,
      handleFinish,
    };
  },

});
</script>