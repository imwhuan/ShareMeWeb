<template>
<div class="fulldiv scrollbar">
<content-layout>
  <template #header>
    <station-header></station-header>
  </template>
  <template #body>
     <a-card title="关于本项目">
      <template #extra>
          <a-tag color="pink">十二米（ShareMe）</a-tag>
      </template>
      <a-typography-text type="warning">十二米（ShareMe）</a-typography-text>
      <a-typography-text type="success">
          为测试版信息平台，她的目的是为了创建一个半开放的个人笔记记录及信息分享平台。
      </a-typography-text>
      <br />
      <a-typography-text type="warning">十二米（ShareMe）</a-typography-text>
      <a-typography-text type="success">
          最终将提供一系列功能包括：
      </a-typography-text>
      <a-typography-text type="danger">权限系统</a-typography-text>、
      <a-typography-text type="danger">文字记录</a-typography-text>、
      <a-typography-text type="danger">媒体文件</a-typography-text>、
      <a-typography-text type="danger">内容分享</a-typography-text>、
      <a-typography-text type="danger">内容推荐</a-typography-text>
      <a-typography-text type="success">
          等功能。
      </a-typography-text>
      <br />
      <a-typography-text type="success">
          系统将致力于应用流行的前沿技术为目标，在系统功能实现的过程中保证开发者的技术学习能力👻。
      </a-typography-text>
    </a-card>
    <br />
    <a-card title="友情链接">
      <template #extra>
          <a-tag color="red">攀不上的友谊</a-tag>
      </template>
      <a-tag color="#55acee">
    <template #icon>
      <twitter-outlined />
    </template>
    Twitter
  </a-tag>
  <a-tag color="#cd201f">
    <template #icon>
      <youtube-outlined />
    </template>
    Youtube
  </a-tag>
  <a-tag color="#3b5999">
    <template #icon>
      <facebook-outlined />
    </template>
    Facebook
  </a-tag>
  <a-tag color="#55acee">
    <template #icon>
      <linkedin-outlined />
    </template>
    LinkedIn
  </a-tag>
    </a-card>
    <br />
    <a-card title="技术栈">
      <template #extra>
          <a-tag color="green">好好学习</a-tag>
      </template>
      <a-tag color="success">
      <template #icon>
        <check-circle-outlined />
      </template>
      success
    </a-tag>
    <a-tag color="processing">
      <template #icon>
        <sync-outlined :spin="true" />
      </template>
      processing
    </a-tag>
    <a-tag color="error">
      <template #icon>
        <close-circle-outlined />
      </template>
      error
    </a-tag>
    <a-tag color="warning">
      <template #icon>
        <exclamation-circle-outlined />
      </template>
      warning
    </a-tag>
    </a-card>
    <br />
    
    <a-card title="项目历程">
      <template #extra>
          <a-tag color="yellow">全部</a-tag>
      </template>
      <a-timeline mode="alternate">
    <a-timeline-item>策划项目 2022-02-26 17:00:00</a-timeline-item>
    <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </a-timeline-item>
    <a-timeline-item color="red" label="2022-02-28 01:23:00">
      寻找Markdown在线编辑器，比对了
      <a-typography-text code>EditorMd</a-typography-text>和
      <a-typography-text code>Vditor</a-typography-text>最后选取了后者，因为。。
      <a-typography-text code>EditorMd</a-typography-text>
      比较重，项目也比较久远，都已经没人维护了，所以趁机想换个轻量级的编辑器~😁
    </a-timeline-item>
    <a-timeline-item>前端web全部改为使用TS重写！为了更方便的使用threejs库，展示3D项目。 2022-03-10</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      大半夜的偷摸上个线！开始运行啦 2022-04-03
    </a-timeline-item>
  </a-timeline>
    </a-card>
    <br />
    <a-divider orientation="right">须知少年凌云志，曾许人间第一流。</a-divider>
  </template>
</content-layout>
</div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import ContentLayout from '@/components/layout/ContentLayout.vue'
import StationHeader from '@/components/home/StationHeader.vue'
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
    components: {
      TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
      ContentLayout,
      StationHeader
    },
  setup() {
    return{
      value1:ref()
    }
  }
})
</script>
<style scoped>
.fulldiv{
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>