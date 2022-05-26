<template>
  <a-descriptions bordered title="个人资料"
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
          <template #extra>
            <a-space>
              <a-button @click="refresh">刷新</a-button>
              <a-button type="primary" @click="toEdit">编辑</a-button>
            </a-space>
          </template>
          <a-descriptions-item label="名称">{{userinfo.name}}</a-descriptions-item>
          <a-descriptions-item label="手机号">{{userinfo.phone}}</a-descriptions-item>
          <a-descriptions-item label="注册时间">{{userinfo.createTime}}</a-descriptions-item>
          <a-descriptions-item label="用户ID">{{userinfo.id}}</a-descriptions-item>
          <a-descriptions-item label="年龄">{{userinfo.age}}</a-descriptions-item>
          <a-descriptions-item label="头像地址">{{userinfo.userImageUrl}}</a-descriptions-item>
          <a-descriptions-item label="性别">{{userinfo.sexRemark}}</a-descriptions-item>
          <a-descriptions-item label="颜值">{{userinfo.yanZhi}}</a-descriptions-item>
          <a-descriptions-item label="账户状态">{{userinfo.userStatusRemark}}</a-descriptions-item>
          <a-descriptions-item label="地址">{{userinfo.address}}</a-descriptions-item>
          <a-descriptions-item label="描述">
            {{userinfo.describe}}
          </a-descriptions-item>
        </a-descriptions>
</template>

<script>
import { GetUserInfo } from "@/plugins/UseLocalDB";
import { defineComponent } from 'vue';
export default defineComponent({
  emits:["switch"],
  methods:{
    toEdit(){
      console.log("点击编辑")
      this.$emit("switch")
    },
    refresh(){
      this.userinfo=GetUserInfo()
    }
  },
  data(){
    return{
      userinfo:GetUserInfo(),
    }
  }
})
</script>

<style>

</style>