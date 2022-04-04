<template>
  <a-result status="403" title="403" sub-title="对不起，你暂时没有权限访问此页面，请考虑切换账号.">
    <template #extra>
        <router-link to="/" class="ant-btn ant-btn-primary" type="button">返回首页</router-link>
    </template>
  </a-result>
</template>