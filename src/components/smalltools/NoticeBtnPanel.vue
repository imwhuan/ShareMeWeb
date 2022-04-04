<template>
    <a-popover title="信息通知" placement="bottom">
        <template #content>
            <p>Content</p>
            <p>Content</p>
        </template>
        <a-button type="text" shape="circle">
            <template #icon><bell-outlined /></template>
        </a-button>
    </a-popover>
</template>

<script>
import { BellOutlined  } from '@ant-design/icons-vue';
export default {
    components:{
        BellOutlined
    }
}
</script>

<style>

</style>