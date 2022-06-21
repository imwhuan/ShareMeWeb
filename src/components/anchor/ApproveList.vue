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
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div>
    <a-pagination v-model:current="currentPageIndex" 
    show-quick-jumper 
    :total="totalDataCount"
     @change="onPageChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
interface DataItem {
  title: string;
}

export default defineComponent({
  props:["header"],
  setup() {
    const currentPageIndex = ref<number>(1);

    const totalDataCount = ref<number>(100);

    const data = ref<DataItem[]>([
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]);

    const onPageChange = (page:number, pageSize:number) => {
      console.log('Page: ', page, pageSize);
    };

    return {
      data,currentPageIndex,totalDataCount,onPageChange
    };
  },
});
</script>

