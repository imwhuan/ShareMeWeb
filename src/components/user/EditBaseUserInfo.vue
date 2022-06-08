<template>
  <a-form
    :model="formState"
    name="validate_other"
    :label-col="{ span: 5 }"
    :wrapper-col="{offset: 1, span: 16 }"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
  >

    <a-form-item
      label="名称"
      name="name"
      has-feedback 
      :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.name"> </a-input>
    </a-form-item>

    <a-form-item label="年龄">
      <a-form-item name="age" no-style>
        <a-input-number v-model:value="formState.age" :min="0" :max="100" />
      </a-form-item>
      <span class="ant-form-text">岁</span>
    </a-form-item>

    <a-form-item name="yanZhi" label="颜值打分">
      <a-slider
        v-model:value="formState.yanZhi"
        :marks="{
          0: '无脸男',
          20: '略显仓促',
          40: '平平无奇',
          60: '靠脸吃饭',
          80: '颜值担当',
          100: '封神',
        }"
      />
    </a-form-item>

    <a-form-item
      name="sex"
      label="性别"
      :rules="[{ required: true, message: 'Please pick an item!' }]"
    >
      <a-radio-group v-model:value="formState.sex">
        <a-radio-button :value="1">男神</a-radio-button>
        <a-radio-button :value="2">女神</a-radio-button>
        <a-radio-button :value="3">保密</a-radio-button>
      </a-radio-group>
    </a-form-item>
    
  <a-form-item
      label="个人描述"
      name="describe"
      has-feedback 
    >
      <a-textarea v-model:value="formState.describe" />
    </a-form-item>
    
  <a-form-item
      label="地址"
      name="address"
      has-feedback 
    >
      <a-textarea v-model:value="formState.address" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-space>
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button html-type="reset" @click="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { LiveUserInfoBaseModel } from '@/http/ShareMeServerModel'
import { GetUserInfo } from "@/plugins/UseLocalDB";
import { PutCurrentUserBase } from '@/http/HttpAccountServer'

export default defineComponent({
  emits:["switch"],
  data(){
    return {
      formState:reactive<LiveUserInfoBaseModel>({
        id:0,
        name:'',
        age:0,
        sex:0,
        describe:'',
        address:'',
        yanZhi:0
      })
    }
  },
  methods:{
    onFinish (values: any){
      console.log('Success:', values);
      PutCurrentUserBase(this.formState).then(res=>{
        if(res.success){
          message.success("信息更新成功！,请刷新页面获取最佳体验🤗")
          this.$emit("switch")
        }else{
          message.error("信息更新失败！"+res.message)
        }
      }).catch(err=>{
       console.log('Failed:', err);
        message.error("信息更新失败！")
      })
    },
    onFinishFailed (errorInfo: any){
      console.log('Failed:', errorInfo);
      message.error("信息更新失败！")
    },
    cancel(){
      this.$emit("switch")
    }
  },
  mounted(){
    const userdata=GetUserInfo()
    if(userdata){
      console.log("1",userdata)
      this.formState.id=userdata.id;
      this.formState.name=userdata.name;
      this.formState.age=userdata.age;
      this.formState.sex=userdata.sex;
      this.formState.describe=userdata.describe;
      this.formState.address=userdata.address;
      this.formState.yanZhi=userdata.yanZhi;
    }else{
      console.log("2")
      this.$router.replace({name:'forbid'})
    }
  }
});
</script>

