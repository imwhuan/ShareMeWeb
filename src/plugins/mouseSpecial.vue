<template>
    <span class="clickbg" :class="{active:ItemActive[index]}" 
    v-for="(item,index) in AllPanel" :key="index" :style="ItemStyles[index]">
    {{item}}
    </span>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
interface ItemStyle{
    top:string,
    left:string,
    color:string
}
export default defineComponent({
    data(){
        return {
            AllPanel:["富强","民主","文明","和谐","ShareMe","你好","世界","再见","苏苏"],
            AllColor:["red","orange","pink","green","deepskyblue","fuchsia","black","orangered"],
            ItemTimers:[] as Array<number>,
            ItemActive:[] as Array<boolean>,
            ItemStyles:[] as Array<ItemStyle>,
            ItemIndex:0,
            ColorIndex:0
        }
    },
    mounted(){
        for(let i=0;i<this.AllPanel.length;i++){
            this.ItemActive.push(false);
            this.ItemStyles.push({
                top:'0px',
                left:'0px',
                color:''
            })
        }
        //document.body.addEventListener("click",this.AfterClick)
    },
    unmounted(){
        //document.body.removeEventListener("click",this.AfterClick);
    },
    methods:{
        AfterClick(ev:MouseEvent){
            clearTimeout(this.ItemTimers[this.ItemIndex]);
            this.ItemActive[this.ItemIndex]=false;
            this.ItemStyles[this.ItemIndex].top=(ev.pageY>20?ev.pageY-20:0)+'px';
            this.ItemStyles[this.ItemIndex].left=ev.pageX+'px';
            this.ItemStyles[this.ItemIndex].color=this.AllColor[this.ColorIndex];
            this.ItemActive[this.ItemIndex]=true;
            let theindex=this.ItemIndex;
            this.ItemTimers[this.ItemIndex]=setTimeout(()=>{
                this.ItemActive[theindex]=false;
            },2000)
            this.ItemIndex>this.AllPanel.length-2?this.ItemIndex=0:this.ItemIndex++;
            this.ColorIndex>this.AllColor.length-2?this.ColorIndex=0:this.ColorIndex++;
            //console.log("点击了",ev);
        },
        ResetActiveItem(index:number){
            this.ItemActive[index]=false;
        }
    }
})
</script>

<style scoped>
.clickbg{
    position: absolute;
    display: none;
    cursor: default;
    user-select: none;
    z-index: 21;
}
.clickbg.active{
    display: block;
    animation: clickActive 2s;
}
@keyframes clickActive {
    0%{
        transform:translateY(0);
        opacity: 1;
    }
    100%{
        transform:translateY(-80px);
        opacity: 0;
    }
}
</style>