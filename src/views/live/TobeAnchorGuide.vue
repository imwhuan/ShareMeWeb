<template>
<no-header-content-layout>
<a-steps v-model:current="current" type="navigation">
      <a-step v-for="(item,index) in steps" status="finish" :key="item.title" :title="item.title" :sub-title="item.subtitle" :description="item.describe">
        <template #icon>
          <solution-outlined v-if="index<1"/>
          <verified-outlined v-else-if="index<2"/>
          <video-camera-add-outlined v-else/>
        </template>
      </a-step>
    </a-steps>
    <div class="steps-content">
      {{ steps[current].content }}
    </div>
    <div class="todobtns">
      <a-space>
        <a-button type="primary" @click="ToDoTask">
          <template #icon>
            <crown-outlined />
          </template>
          我已阅读条款，开始申请
        </a-button>
        <a-button @click="ToShowTask">
          <template #icon>
            <verified-outlined />
          </template>
          我已经申请，查看申请结果
        </a-button>
      </a-space>
    </div>
</no-header-content-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import {SolutionOutlined,VerifiedOutlined,VideoCameraAddOutlined,CrownOutlined} from '@ant-design/icons-vue';
import NoHeaderContentLayout from '@/components/layout/NoHeaderContentLayout.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components:{
    SolutionOutlined,VerifiedOutlined,VideoCameraAddOutlined,CrownOutlined,NoHeaderContentLayout
  },
  setup() {
    const current = ref<number>(0);
    const router=useRouter()
    const ToShowTask=()=>{
      message.warning("开始查看申请进度")
    }
    const ToDoTask=()=>{
      router.push({name:"anchorapplypage"})
      message.success("开始申请")
    }
    return {
      ToShowTask,
      ToDoTask,
      current,
      steps: [
        {
          title: '申请',
          subtitle:'',
          describe:'填写申请表单',
          content: '世人慌慌张张，不过图碎银几两，而这碎银几两，可解这世间万种慌张，保老人晚年安康， 儿女入得学堂，柴米油盐五谷粮。',
        },
        {
          title: '审批',
          subtitle:'机审+人工',
          describe:'7个工作日内反馈结果',
          content: '以诚挚之心，领岁月教诲，敬年少热诚，愿将来胜过往，永远热泪盈眶。',
        },
        {
          title: '激活',
          subtitle:'3个工作日内',
          describe:'开启第一场直播',
          content: '我从年幼握剑那一刻起，便知自己会是这江湖中的天下第一。',
        },
      ],
    };
  },
});
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
.todobtns{
  text-align: center;
  margin-top: 16px;
}
</style>
