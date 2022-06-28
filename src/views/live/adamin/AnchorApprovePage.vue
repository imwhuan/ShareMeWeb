<template>
<a-tabs v-model:activeKey="activeTab">
    <a-tab-pane key="1" tab="全部">
      <approve-list header="全部"></approve-list>
    </a-tab-pane>
    <a-tab-pane key="2" tab="待审批">
      <approve-list-doing header="待审批"></approve-list-doing>
    </a-tab-pane>
    <a-tab-pane key="3" tab="审批通过">
      <approve-list-ok header="审批通过"></approve-list-ok>
    </a-tab-pane>
    <a-tab-pane key="4" tab="审批拒绝">
      <approve-list-refuse header="审批拒绝"></approve-list-refuse>
    </a-tab-pane>
    <a-tab-pane key="5" tab="我的审批记录">
      <approve-list header="我的审批记录"></approve-list>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { defineComponent,ref} from 'vue';
import ApproveList from '@/components/anchor/ApproveList.vue'
import ApproveListDoing from '@/components/anchor/ApproveListDoing.vue'
import ApproveListOk from '@/components/anchor/ApproveListOk.vue'
import ApproveListRefuse from '@/components/anchor/ApproveListRefuse.vue'
export default defineComponent({
  data(){
    return{
      activeTab:ref('1')
    }
  },
  components:{
    ApproveList,ApproveListDoing,ApproveListRefuse,ApproveListOk
  }
})
</script>

<style>

</style>