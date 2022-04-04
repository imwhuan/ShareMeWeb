<template>
      <div class="scrollbar" style="height: calc(100% - 48px);">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="ClickMenuItem">
        <a-menu-item key="Home-Index">
          <user-outlined />
          <span>主页</span>
        </a-menu-item>
        <a-menu-item key="About">
          <video-camera-outlined />
          <span>关于</span>
        </a-menu-item>
        <a-menu-item key="editor">
          <upload-outlined />
          <span>编辑器</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
        <template #icon>
          <upload-outlined />
        </template>
        <template #title>3D场景</template>
        <a-menu-item-group key="g1">
          <template #icon>
            <upload-outlined />
          </template>
          <template #title>模型展示</template>
          <a-menu-item key="Bingdundun">冰墩墩</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g2" title="其他">
          <a-menu-item key="bingdd2">未定义</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      </a-menu>
      </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    data(){
        return{
            selectedKeys: ref(['/'])
        }
    },
    components: {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined
    },
    methods:{
        ClickMenuItem(e){
        this.$router.push({name:e.key})
        // if(this.$route.path!==path){
        //   this.$router.push(path)
        // }
        }
    }
})
</script>

<style scoped>
.logo {
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
.logo:hover {
    transform: scale(1.1);
}
</style>