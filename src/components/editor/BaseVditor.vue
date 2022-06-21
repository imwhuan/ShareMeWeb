<template>
  <div id="vditor"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default defineComponent({
    data(){
        return {
            contentEditor:{} as Vditor
        }
    },
    mounted(){
        this.contentEditor = new Vditor('vditor', {
            height: 360,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after: () => {
                this.contentEditor.setValue('hello, Vditor + Vue!')
            },
            cdn:"http://www.localcpu.love/npm/vditor@3.8.12",
            preview:{
                theme:{
                    current:"light",
                    path:"http://www.localcpu.love/npm/vditor@3.8.12/dist/css/content-theme"
                }
            }
        })
    }
})
</script>

<style>
.vditor--fullscreen .vditor-toolbar--pin{
    position: static;
}
</style>