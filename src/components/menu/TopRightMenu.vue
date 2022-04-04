<template>
    <a-space>
        <template v-if="!mini">
            <search-panel></search-panel>
            <notice-btn-panel></notice-btn-panel>
            <full-screen-btn></full-screen-btn>
            <upload-panel></upload-panel>
            <setting-panel></setting-panel>
        </template>
        
        <header-name-panel></header-name-panel>
        <switch-language-btn @switchLang="$emit('switchLang',$event)"></switch-language-btn>
    </a-space>
</template>

<script>
import SearchPanel  from '@/components/smalltools/SearchPanel.vue'
import NoticeBtnPanel  from '@/components/smalltools/NoticeBtnPanel.vue'
import HeaderNamePanel  from '@/components/smalltools/HeaderNamePanel.vue'
import FullScreenBtn  from '@/components/smalltools/FullScreenBtn.vue'
import SettingPanel  from '@/components/smalltools/SettingPanel.vue'
import UploadPanel  from '@/components/smalltools/UploadPanel.vue'
import SwitchLanguageBtn  from '@/components/smalltools/SwitchLanguageBtn.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
        mini:{
            type:Boolean,
            default:false
        }
    },
    emits:{
        switchLang:(lang)=>{
            if(lang){
                return true
            }else{
                return false
            }
        }
    },
    components:{
        SearchPanel,NoticeBtnPanel,HeaderNamePanel,FullScreenBtn,SettingPanel,UploadPanel,SwitchLanguageBtn
    }
})
</script>

<style>

</style>