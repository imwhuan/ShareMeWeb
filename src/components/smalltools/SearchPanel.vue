<template>
    <a-button type="text" shape="circle" @click="showModal" title="搜索">
        <template #icon><SearchOutlined /></template>
    </a-button>
    <a-modal v-model:visible="visible" title="全局搜索" @ok="handleOk">
      <template #footer>
          <a-space>
              <span>
                <a-typography-text keyboard>↲</a-typography-text>
                确认
              </span>
              <span>
                <a-typography-text keyboard>↑</a-typography-text>
                <a-typography-text keyboard>↓</a-typography-text>
                切换
              </span>
              <span>
                <a-typography-text keyboard>ESC</a-typography-text>
                关闭
              </span>
          </a-space>
      </template>
      <a-input v-model:value="searchValue" placeholder="搜索" size="large">
        <template #prefix>
            <search-outlined></search-outlined>
        </template>
        <template #suffix>
            <a-tooltip title="搜索站内资源">
            <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
        </template>
        </a-input>
        <br/>
        <br/>
        <a-empty />
    </a-modal>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { SearchOutlined,InfoCircleOutlined  } from '@ant-design/icons-vue';
export default defineComponent({
    components:{
        SearchOutlined,InfoCircleOutlined 
    },
  setup() {
    const loading = ref(false);
    const visible = ref(false);
    const searchValue=ref('')
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        visible.value = false;
      }, 2000);
    };

    const handleCancel = () => {
      visible.value = false;
    };

    return {
      loading,
      visible,searchValue,
      showModal,
      handleOk,
      handleCancel,
    };
  },

});
</script>