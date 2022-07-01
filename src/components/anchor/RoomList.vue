<template>
  <a-row justify="space-around" :gutter="[16,16]">
    <a-col :xs="20" :sm="10" :md="5" :lg="4" v-for="item in list" :key="item.id" @click="GetInRoom(item.id)">
      <a-card hoverable>
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta :title="item.title">
          <template #description>{{item.desc}}</template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent} from 'vue';
export default defineComponent({
  data(){
    return {
      list:[{id:1,title:"AAAAA",desc:"阿三的阿三的"},
    {id:2,title:"BBBBB",desc:"阿三的阿三的"},
    {id:3,title:"CCCCC",desc:"阿三的阿三的"},{id:4,title:"DDDDD",desc:"阿三的阿三的"},
    {id:5,title:"EEEEE",desc:"阿三的阿三的"},{id:6,title:"RRRRR",desc:"阿三的阿三的"}]
    }
  },
  methods:{
    GetInRoom(id){
      this.$router.push({name:"getinliveroom",params:{id:id}})
    }
  },
})
</script>

<style>

</style>