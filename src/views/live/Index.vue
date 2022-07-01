<template>
  <h1>直播首页</h1>
  <live-room-list-page></live-room-list-page>
</template>

<script>
import { defineComponent} from 'vue';
import LiveRoomListPage from '@/views/live/LiveRoomListPage.vue'
export default defineComponent({
  data(){
    return{

    }
  },
  components:{
    LiveRoomListPage
  }
})
</script>

<style>

</style>