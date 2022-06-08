<template>
  <no-header-content-layout>
    <apply-form></apply-form>
  </no-header-content-layout>
</template>

<script>
import ApplyForm from '@/components/anchor/ApplyForm.vue'
import NoHeaderContentLayout from '@/components/layout/NoHeaderContentLayout.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  components:{
    ApplyForm,NoHeaderContentLayout
  }
})
</script>

<style>

</style>