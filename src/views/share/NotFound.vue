<template>
  <a-result status="404" title="404" sub-title="对不起，你访问的页面不存在哦.">
    <template #extra>
      <a-button type="primary" @click="BackHome">返回首页</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { useRouter} from 'vue-router'
import { defineComponent} from 'vue'
export default defineComponent({
    setup(){
        const router=useRouter();
        return {
            router
        }
    },
    methods:{
        BackHome(){
            this.router.replace('/')
        }
    }
})
</script>

<style>

</style>