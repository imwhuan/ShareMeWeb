<template>
  <a-popover placement="bottom">
    <template #content>
      <a-card style="width: 300px">
        <template #cover>
          <div class="bgimgbox">
          <img
            alt="example"
            v-bind:src="global.uheadimg??img"
          />
          </div>
        </template>
        <template #actions>
          <a-tooltip title="设置" color="cyan">
            <setting-outlined key="setting" />
          </a-tooltip>

          <a-tooltip title="编辑" color="cyan">
            <edit-outlined key="edit" />
          </a-tooltip>
          
          <a-tooltip title="资料" color="cyan">
            <ellipsis-outlined key="ellipsis"  @click="touserinfo"/>
          </a-tooltip>
          
          <a-tooltip title="退出" color="cyan">
            <logout-outlined  @click="loginout"/>
          </a-tooltip>
          
        </template>
        <a-card-meta :title="global.uname" :description="userinfo.describe??'这个人很懒，什么也没留下...'">
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
    <a-avatar alt="👻" v-if="global.uheadimg" :src="global.uheadimg" />
    <a-avatar v-else style="background-color: #87d068">{{global.uname}}</a-avatar>
  </a-popover>
</template>

<script>
import { UserOutlined,SettingOutlined, EditOutlined, EllipsisOutlined,LogoutOutlined } from '@ant-design/icons-vue';
import { defineComponent,ref } from 'vue';
import { ClearUserData,GetUserInfo } from "@/plugins/UseLocalDB";
import {GetImageUrl} from '@/http/GetHttpUrl'
import { GlobalData } from "@/plugins/GlobalData";

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
        //this.$router.go(0)
      },
      touserinfo(){
        this.$router.push('/userinfo')
      }
    },
    data(){
      return{
        userinfo:GetUserInfo(),
        global:ref(GlobalData),
        img:GetImageUrl("few50.jpeg")
      }
    }
})
</script>

<style lang="scss" scoped>
.bgimgbox{
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  &>img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>