<template>
  <div class="content-header">
      <slot name="header"></slot>
  </div>
  <div class="content-body">
      <slot name="body"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.content-header,.content-body{
    background-color: #fff;
}
.content-body{
    margin: 16px 16px 0 16px;
    padding: 16px;
}
</style>>
