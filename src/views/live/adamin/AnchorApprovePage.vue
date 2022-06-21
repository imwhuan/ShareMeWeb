<template>
<a-tabs v-model:activeKey="activeTab">
    <a-tab-pane key="1" tab="全部">
      <approve-list header="全部"></approve-list>
    </a-tab-pane>
    <a-tab-pane key="2" tab="待审批">
      <approve-list header="待审批"></approve-list>
    </a-tab-pane>
    <a-tab-pane key="3" tab="审批通过">
      <approve-list header="审批通过"></approve-list>
    </a-tab-pane>
    <a-tab-pane key="4" tab="审批拒绝">
      <approve-list header="审批拒绝"></approve-list>
    </a-tab-pane>
    <a-tab-pane key="5" tab="我的审批记录">
      <approve-list header="我的审批记录"></approve-list>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { defineComponent,ref} from 'vue';
import ApproveList from '@/components/anchor/ApproveList.vue'
export default defineComponent({
  data(){
    return{
      activeTab:ref('1')
    }
  },
  components:{
    ApproveList
  }
})
</script>

<style>

</style>