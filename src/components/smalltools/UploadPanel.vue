<template>
  <a-upload>
        <a-button type="text" shape="circle" title="上传文件">
            <template #icon><cloud-upload-outlined /></template>
        </a-button>
    </a-upload>
</template>

<script>
import { CloudUploadOutlined } from '@ant-design/icons-vue';
export default {
    components:{
        CloudUploadOutlined
    }
}
</script>

<style>

</style>