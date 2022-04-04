<template>
    <a-dropdown>
        <a-space style="cursor: pointer;">
            <a-avatar alt="👻" :src="headerimg" />
            {{username}}
        </a-space>
        <template #overlay>
        <a-menu>
            <a-menu-item>
            <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
                <a-button type="text" @click="visible=true">退出系统</a-button>
                <!-- <router-link to="/login">退出系统</router-link> -->
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
            <a href="javascript:;">退出系统</a>
            </a-menu-item>
        </a-menu>
        </template>
    </a-dropdown>
    <a-modal
      v-model:visible="visible"
      title="提醒"
      ok-text="确认"
      cancel-text="取消"
        :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>{{modalText}}</p>
    </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {GetSysSetting,GetImageUrl} from '../../http/ShareMeServer'
export default defineComponent({
    setup() {
    const modalText = ref('确认退出当前账号？（当前未保存数据可能会丢失）');
    const visible = ref(false);
    const confirmLoading = ref(false);
    let username=sessionStorage.getItem("username")??"baby"
    const headerimg=GetImageUrl("heads/h1.jpeg")
    const showModal = () => {
      visible.value = true;
    };
    return {
      username,
        headerimg,
      modalText,
      visible,
      confirmLoading,
      showModal,
    };
  },
    methods:{
        handleOk(){
            this.modalText = '正在退出当前账号...';
      this.confirmLoading = true;
      GetSysSetting("welcome").then(()=>{
          //console.log("退出成功",res)
        this.confirmLoading = false;
        this.visible = false;
        window.sessionStorage.clear();
        this.$router.go(0)
      }).catch(err=>{
        this.confirmLoading = false;
          console.log("退出失败",err)
      })
        }
    }
})
</script>

<style>

</style>