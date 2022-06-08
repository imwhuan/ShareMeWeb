<template>
<a-config-provider :locale="locale === 'en' ? enUS : zhCN">
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <a-layout-sider v-model:collapsed="collapsed" style="background-color:#fff" :trigger="null" collapsible v-if="width>=768">
      <div class="logo" @click="Info">{{title}}</div>
      <side-menu></side-menu>
    </a-layout-sider>
    <template v-else>
      <a-drawer
        v-model:visible="collapsed"
        :closable="false"
        width="70%"
        placement="left"
        :body-style="{padding:0}"
      >
      <template #title>
         <div class="logo" @click="Info">{{title}}</div>
      </template>
      <side-menu></side-menu>
      </a-drawer>
    </template>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;height: 48px;line-height: 48px;">
        <a-row type="flex" justify="space-between" align="bottom">
          <a-col>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            <div style="display:inline-block">
              <head-bread></head-bread>
            </div>
          </a-col>
          <a-col :flex="1" style="text-align: end;">
            <top-right-menu :mini="width<768" @switchLang="$emit('switchLang',$event)"></top-right-menu>
          </a-col>
        </a-row>
        
      </a-layout-header>
      <a-layout-content class="scrollbar" style="minHeight: 280px">
      <a-layout>
        <a-layout-content>
        <router-view/>
        </a-layout-content>
      <a-layout-footer style="text-align: center">
        <a-tag color="green">imwhuan</a-tag>
        <br/>
        Ant Design Vue ©2022 Created by Huan
      </a-layout-footer>

      </a-layout>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </a-config-provider>
</template>
<script lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import HeadBread from '@/components/smalltools/HeaderBread.vue'
import SideMenu from '@/components/menu/SideMenu.vue'
import TopRightMenu from '@/components/menu/TopRightMenu.vue'
import enUS  from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { addResizeEvent,removeResizeEvent } from '@/plugins/WinResizeEvent'

export default defineComponent({
  emits:{
      switchLang:(lang)=>{
          if(lang){
              return true
          }else{
              return false
          }
      }
    },
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HeadBread,
    SideMenu,
    TopRightMenu
  },
  data() {
    return {
      collapsed: ref(false),
      width:window.innerWidth,
      height:window.innerHeight,
      title:sessionStorage.getItem("web-title")??"*/+-",
      enUS,
      zhCN,
      locale:zhCN.locale
    };
  },
  mounted(){
    addResizeEvent(this.winResize)
  },
  unmounted(){
    removeResizeEvent(this.winResize)
  },
  methods:{
    Info(){
      message.info('💕好喜欢你丫🤟');
    },
    winResize(){
        //console.log("布局页触发Resize",this.width)
        this.width=window.innerWidth;
        this.height=window.innerHeight;
    }
  }
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 48px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.smallside{
  background-color: rgba(139, 138, 138, 0.315);
}
#components-layout-demo-custom-trigger .logo {
  height: 24px;
  background: rgb(65 184 131);
  margin: 12px;
  font-size: 16px;
  text-align: center;
  border-radius: 12px;
  transition: all .5s;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}
#components-layout-demo-custom-trigger .logo:hover {
    transform: scale(1.1);
} 

.site-layout .site-layout-background {
  background: #fff;
}
</style>