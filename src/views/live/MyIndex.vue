<template>
<content-layout>
  <template #header>
    <station-header></station-header>
  </template>
  <template #body>
  直播平台个人中心
  <br />
  <a-button type="primary" @click="ToBeAnchor">
    <template #icon>
      <crown-outlined />
    </template>
    申请成为主播
  </a-button>
  </template>
</content-layout>
</template>

<script>
import { CrownOutlined } from '@ant-design/icons-vue';
import { defineComponent} from 'vue';
import ContentLayout from '@/components/layout/ContentLayout.vue'
import StationHeader from '@/components/home/StationHeader.vue'

export default defineComponent({
  components:{
    CrownOutlined,ContentLayout,StationHeader
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