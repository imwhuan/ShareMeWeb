<template>
  <a-popover placement="bottom">
    <template #content>
      <a-card style="width: 300px">
        <template #cover>
          <img
            alt="example"
            v-bind:src="img"
          />
        </template>
        <template #actions>
          <a-tooltip title="设置" color="cyan">
            <setting-outlined key="setting" />
          </a-tooltip>

          <a-tooltip title="编辑" color="cyan">
            <edit-outlined key="edit" />
          </a-tooltip>
          
          <a-tooltip title="其他" color="cyan">
            <ellipsis-outlined key="ellipsis"/>
          </a-tooltip>
          
          <a-tooltip title="退出" color="cyan">
            <logout-outlined  @click="loginout"/>
          </a-tooltip>
          
        </template>
        <a-card-meta :title="userinfo.name" description="这个人很懒，什么也没留下...">
          <template #avatar>
            <a-avatar>
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </template>
        </a-card-meta>
      </a-card>
    </template>
    <a-avatar alt="👻" v-if="userinfo.userImageUrl" :src="userinfo.userImageUrl" />
    <a-avatar v-else style="background-color: #87d068">{{userinfo.name}}</a-avatar>
  </a-popover>
</template>

<script>
import { UserOutlined,SettingOutlined, EditOutlined, EllipsisOutlined,LogoutOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { ClearUserData,GetUserInfo } from "@/plugins/UseLocalDB";
import {GetImageUrl} from '@/http/ShareMeServer'

export default defineComponent({
  emits:{
    afterloginout:null
  },
  components:{
        UserOutlined,SettingOutlined, EditOutlined, EllipsisOutlined,LogoutOutlined
    },
    methods:{
      loginout(){
        ClearUserData(),
        this.$emit("afterloginout")
      }
    },
    data(){
      return{
        userinfo:GetUserInfo(),
        img:GetImageUrl("few50.jpeg")
      }
    }
})
</script>

<style>

</style>