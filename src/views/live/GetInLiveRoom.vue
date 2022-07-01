<template>
  <a-divider>欢迎来到小橘子的直播间:{{id}}</a-divider>
  <get-in-chat-room :id="id"></get-in-chat-room>
</template>

<script>

import { defineComponent} from 'vue';
import GetInChatRoom from '@/components/anchor/GetInChatRoom.vue'
export default defineComponent({
  props:["id"],
  components:{
    GetInChatRoom
  }
})
</script>

<style>

</style>