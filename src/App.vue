<template>
<div style="width:100%;height:100%;" @click="mainClick($event)">
  <mouse-special ref="mousePlugin"></mouse-special>
  <router-view/>
</div>
</template>
<script lang="ts">
import mouseSpecial from '@/plugins/mouseSpecial.vue'
import { defineComponent} from 'vue'
import { GetSysSetting } from '@/http/ShareMeServer'
import { ShareMeSysSetting } from '@/http/ShareMeServerModel'

export default defineComponent({
  components:{
    mouseSpecial
  },
  methods:{
    mainClick(ev:Event):void{
      //console.log("mousePlugin",this.$refs.mousePlugin)
      //console.log("ev",ev)
      (this.$refs.mousePlugin as any).AfterClick(ev)
    }
  },
  mounted(){
      if(sessionStorage.getItem("web-info")==null){
        GetSysSetting('web','').then(res=>{
          console.log("获取到了",res)
          const resdata=res.data as Array<ShareMeSysSetting>
          resdata.forEach(element => {
             sessionStorage.setItem("web-"+element.sysKey,element.sysValue)
          });
          sessionStorage.setItem("web-info",new Date().toLocaleString())
        }).catch(err=>{
          console.log('获取web信息时错误',err)
        })
      }
    },
})
</script>
<style lang="scss">
.scrollbar{
  overflow: scroll;
}
.scrollbar::-webkit-scrollbar {
    width: 7px;
    height: 1px;
}
.scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 2px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 20%);
}
#app {
  font-family: Comic Sans MS, Helvetica, Arial, sans-serif;
  height: 100%;
}
html,body{
  height: 100%;
  overflow: hidden;
}
</style>
