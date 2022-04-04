<template>
  <div class="gutter-example">
    <a-row :gutter="[16,16]" justify="center">
      <a-col class="gutter-row" flex="100px">
         <a-avatar :size="64" :src="headimg" />
      </a-col>
      <a-col class="gutter-row" flex="auto">
        <a-row :gutter="[16,8]" justify="space-between">
            <a-col class="gutter-row" :xs="24" :sm="24" :md="14">
              <a-space direction="vertical">
                <a-typography-text>{{hello}}, {{username}}, 开始您一天的工作吧！</a-typography-text>
                <a-typography-text type="secondary">今日晴，20℃ - 32℃！😄👻🎇💕😁👩🎊🎞️🎠🎡🖼️🧶🥪🥯</a-typography-text>
              </a-space>
            </a-col>
            <a-col class="gutter-row" :xs="24" :sm="24" :md="10">
                <a-row :gutter="16" justify="end">
                  <a-col class="gutter-row">
                    <a-space direction="vertical">
                      <a-typography-text type="secondary">便签</a-typography-text>
                      <a-typography-text>1/7</a-typography-text>
                    </a-space>
                  </a-col>
                  <a-col class="gutter-row">
                    <a-space direction="vertical">
                      <a-typography-text type="secondary">任务</a-typography-text>
                      <a-typography-text>19</a-typography-text>
                    </a-space>
                  </a-col>
                  <a-col class="gutter-row">
                    <a-space direction="vertical">
                      <a-typography-text type="secondary">提醒</a-typography-text>
                      <a-typography-text>27</a-typography-text>
                    </a-space>
                  </a-col>
              </a-row>
            </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {GetImageUrl} from '../../http/ShareMeServer'
import {UserInfo} from '@/plugins/Account';

export default defineComponent({
  data(){
    let hello="早安"
    const hour=new Date().getHours()
    if(hour>18){
      hello="晚上好"
    }else if(hour>13){
      hello="下午好"
    }else if(hour>10){
      hello="中午好"
    }
    return {
      headimg:GetImageUrl("heads/h1.jpeg"),
      username:UserInfo.name,
      hello
    }
  }
})
</script>

<style scoped>
.gutter-example {
  padding: 16px;
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
</style>