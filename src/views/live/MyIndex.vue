<template>
  直播平台个人中心
  <br />
  <a-button type="primary" @click="ToBeAnchor">
    <template #icon>
      <crown-outlined />
    </template>
    申请成为主播
  </a-button>
</template>

<script>
import { CrownOutlined } from '@ant-design/icons-vue';
import { defineComponent} from 'vue';

export default defineComponent({
  components:{
    CrownOutlined
  },
  methods:{
    ToBeAnchor(){
      this.$router.push({name:"tobeanchorguide"})
    }
  }
})
</script>

<style>

</style>