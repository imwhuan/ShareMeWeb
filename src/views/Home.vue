<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div id="contt" ref="contdiv">
      哈哈哈哈哈哈哈哈哈哈
    </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
  mounted() {
    this.$refs.contdiv.style.backgroundColor = '#f00';
    console.log("引用对象",this.$refs.contdiv);
    const {aa,bb}=this.test()
    console.log(aa,bb)
  },
  methods:{
    test(){
      return {"aa":"AA","bb":"BB"}
    }
  }
})
export default class Home extends Vue {}
</script>
