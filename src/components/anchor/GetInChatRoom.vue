<template>
  <a-divider>聊天室:{{id}}</a-divider>
  <a-dropdown :trigger="['contextmenu']">
    <div class="chatMsgContent scrollbar" ref="chatDiv">
      <a-list size="small" :data-source="chatData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.time.toLocaleString()">
              <template #title>
                {{ item.uname }} : {{item.msg}}
              </template>
              <template #avatar>
                <a-avatar :src="item.uhead" v-if="item.uhead"/>
                <a-avatar style="color: #f56a00; background-color: #fde3cf" v-else>{{item.uname}}</a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="clearChatData">清屏</a-menu-item>
        <a-menu-item key="2" @click="saveLogs">保存记录</a-menu-item>
        <a-menu-item key="3" @click="stopConn">断开房间连接</a-menu-item>
        <a-menu-item key="3" @click="startConn">申请房间连接</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  
  <a-input-search
      v-model:value="theMsg"
      placeholder="输入要发送的消息"
      @search="sendMsg"
    >
      <template #enterButton>
        <a-button>发送</a-button>
      </template>
    </a-input-search>
</template>

<script  lang="ts">
import { defineComponent,ref, onUnmounted, onMounted} from 'vue';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'
import { message } from 'ant-design-vue';
import { GetLiveChatRoomHubUrl } from '@/http/GetHttpUrl'
import { GetUserToken } from '@/plugins/UseLocalDB'
export default defineComponent({
  props:["id"],
  setup(props){
    const chatDiv=ref<HTMLDivElement>();
    const chatData=ref([{
      uid:"0",uname:"系统",uhead:"",msg:"欢迎来到聊天室",time:new Date()
    }]);
  
    const connection=new HubConnectionBuilder().withUrl(GetLiveChatRoomHubUrl(GetUserToken())).build();
    connection.on("RoomSysMsg",(userid,username,userhead,msg,time)=>{
      console.log("收到系统消息",userid,username,userhead,msg,time)
      chatData.value.push({uid:userid,uname:username??"匿名",uhead:userhead,msg:msg,time:new Date(time)})
    })
    connection.onclose(err=>{
      console.log("连接关闭",err)
    })
    connection.start().then(()=>{
      console.log("连接已开启")
      connection.send("EnterTheRoom",props.id)
      //connection.send("SendMsg",props.id,"我来了哦")
    })
    const theMsg=ref('')

    const sendMsg=()=>{
      if(connection.state!=HubConnectionState.Connected){
        message.error("未与该聊天室建立连接，无法发送信息！"+connection.state)
      }
      if(theMsg.value){
        connection.send("SendMsg",props.id,theMsg.value)
        theMsg.value=""
        
        setTimeout(()=>{
          if(chatDiv.value){
            chatDiv.value.scrollTop=chatDiv.value.scrollHeight;
          }
        },200)
      }else{
        message.error("发送信息不能为空！")
      }
    }
    const clearChatData=()=>{
      chatData.value=[];
      message.success("清屏成功！")
    }
    const saveLogs=()=>{
      message.warning("该功能未实现！")
    }
    const stopConn=()=>{
      if(connection.state==HubConnectionState.Connected){
        connection.stop()
        chatData.value.push({uid:"0",uname:"系统",uhead:"",msg:"离开房间",time:new Date()})
        message.success("与该聊天室的连接已断开！")
      }else{
        message.error("当前与该聊天室的连接不处于连接中的状态，无法关闭！"+connection.state)
      }
    }
    const startConn=()=>{
      if(connection.state==HubConnectionState.Disconnected){
        connection.start().then(()=>{
          console.log("连接已开启")
          connection.send("EnterTheRoom",props.id)
          //connection.send("SendMsg",props.id,"我来了哦")
          message.success("已成功与该聊天室建立连接！")
        }).catch((err)=>{
          console.log("连接失败",err)
          message.error("与该聊天室建立连接出现错误，连接失败！"+err)
        })
      }else{
        message.error("当前与该聊天室的连接不处于断开的状态，无法重新执行连接请求！"+connection.state)
      }
    }
    onMounted(()=>{
      console.log("chatDiv.value",chatDiv.value)
    })
    onUnmounted(()=>{
      connection.stop()
    })
    return {chatData,theMsg,sendMsg,chatDiv,clearChatData,saveLogs,startConn,stopConn}
  },
})
</script>

<style lang="scss" scoped>
.chatMsgContent{
  background-color: floralwhite;
  border-radius: 10px;
  height: 500px;
  width: 100%;
  margin-bottom: 10px;
}
</style>>