<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #header>
      <div>{{header}}</div>
    </template>
    <template #footer>
      <div>Footer</div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a key="list-loadmore-edit">详情</a>
          <a key="list-loadmore-more">打招呼</a>
        </template>
        <a-list-item-meta
          :description="item.describe"
        >
          <template #title>
            <a-space>
              <a-tag color="pink">申请人 {{item.userName}}</a-tag>
              <a-tag color="green">申请类型 {{item.anchorTypeDesc}}</a-tag>
              <a-tag color="blue">申请时间 {{item.createTime}}</a-tag>
            </a-space>
          </template>
          <template #avatar>
            <a-avatar :src="item.userHead" v-if="item.userHead"/>
            <a-avatar style="color: #f56a00; background-color: #fde3cf" v-else>{{item.userName}}</a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div>
    <a-pagination v-model:current="currentPageIndex" 
    :defaultPageSize="currentPageSize"
    show-quick-jumper 
    show-size-changer
    :total="totalDataCount"
    :showTotal="total=>`共${total}条记录`"
     @change="onPageChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
import { GetApplyTitleList } from '@/http/HttpAnchorApplyServer'
import { notification } from 'ant-design-vue';
import type { ApproveTitleModel } from "@/http/ShareMeServerModel";


export default defineComponent({
  props:["header"],
  setup() {
    const currentPageIndex = ref<number>(1);
    let currentPageSize=10;

    const totalDataCount = ref<number>(100);
    const data = ref<ApproveTitleModel[]>([]);

    GetApplyTitleList(null,currentPageIndex.value,currentPageSize).then(res=>{
      if(res.success){
        data.value.length=0;
        totalDataCount.value=res.data.total;
        data.value=res.data.datas
        // for(let i=0;i<res.data.datas.length;i++){
        //   data.value.push({title:res.data.datas[i].describe})
        // }
      }
    }).catch(err=>{
      notification.error({message:"读取数据失败！",description:err.message?err.message:'未返回错误信息',duration:0})
    })
    const onPageChange = (page:number, pageSize:number) => {
      console.log('Page: ', page, pageSize);
      //currentPageSize=pageSize
      GetApplyTitleList(null,page,pageSize)
    };

    return {
      data,currentPageIndex,currentPageSize,totalDataCount,onPageChange
    };
  },
});
</script>

