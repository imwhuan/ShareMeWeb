<template>
<content-layout>
  <template #header>
    <live-header></live-header>
  </template>
  <template #body>
    <router-view/>
  </template>
</content-layout>
</template>

<script>
import { defineComponent,ref} from 'vue';
import ContentLayout from '@/components/layout/ContentLayout.vue'
import LiveHeader from '@/components/layout/LiveHeader.vue'
export default defineComponent({
  data(){
    return{
      activeTab:ref('1')
    }
  },
  components:{
    ContentLayout,LiveHeader
  }
})
</script>

<style>

</style>