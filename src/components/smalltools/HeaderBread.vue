<template>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {

    const routes = ref([]);
    return {
      basePath: '',
      routes,
    };
  },
  watch:{
    '$route':{
      handler(to){
        this.routes=[]

        for(let i=0;i<to.matched.length;i++){
          this.routes.push({path:to.matched[i].path,breadcrumbName:to.matched[i].name})
        }
      }
    }
  },
  methods:{
    
  }
});
</script>