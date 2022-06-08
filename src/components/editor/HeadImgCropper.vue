<template>
  <div class="cropper-content">
    <div class="cropper-box">
      <a-row type="flex" justify="space-around" align="top">
        <a-col :sm="24" :md="16" :lg="14">
          <div class="cropper">
            <vue-cropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                @realTime="realTime"
                @imgLoad="imgLoad">
            </vue-cropper>
          </div>
        </a-col>
        <a-col :sm="24" :md="16" :lg="8">
          <!--预览效果图-->
          <img v-if="!previews.url&&global.uheadimg" :src="global.uheadimg" style="height:200px;">
          <div class="show-preview" v-else>
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
      <br />
      <!--底部操作工具按钮-->
      <div class="footer-btn">
        <a-space>
          <label class="ant-btn ant-btn-primary" :for="'selectheadimg'+Name">
          <folder-open-outlined />&nbsp;&nbsp;选择图片</label>
          <input type="file" :id="'selectheadimg'+Name" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
          <a-button type="primary" danger @click="changeScale(1)">
            <template #icon>
              <plus-circle-outlined />
            </template>
            放大
          </a-button>
          <a-button type="primary" danger @click="changeScale(-1)">
            <template #icon>
              <minus-circle-outlined />
            </template>
            缩小
          </a-button>
          <a-button type="primary" danger @click="rotateLeft">
            <template #icon>
              <rotate-left-outlined />
            </template>
            左旋转
          </a-button>
          <a-button type="primary" danger @click="rotateRight">
            <template #icon>
              <rotate-right-outlined />
            </template>
            右旋转
          </a-button>
          <a-button @click="uploadImg('blob')" type="primary" style="background-color:rgb(65 184 131)">
            <template #icon>
              <cloud-upload-outlined />
            </template>
            上传图片
          </a-button>
        </a-space>
      </div>
  </div>
</template>

<script>
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { defineComponent,ref } from 'vue';
import { message,notification } from 'ant-design-vue';
import { UploadUserHeadImg } from '@/http/HttpAccountServer';
import { FolderOpenOutlined, CloudUploadOutlined,PlusCircleOutlined,MinusCircleOutlined,RotateLeftOutlined,RotateRightOutlined } from '@ant-design/icons-vue';
import GlobalData from "@/plugins/GlobalData";

export default defineComponent({
  emits:["uploadfinish"],
  name: "CropperImage",
  components: {
    VueCropper,FolderOpenOutlined,CloudUploadOutlined,PlusCircleOutlined,MinusCircleOutlined,RotateLeftOutlined,RotateRightOutlined
  },
  props:['Name'],
  data() {
    return {
      global:ref(GlobalData),
      name:this.Name,
      previews: {},
      option:{
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 230,  //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: false,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: '230px 150px'  //图片默认渲染方式
      }
    };
  },
  methods: {
    //初始化函数
    imgLoad (msg) {
      console.log("工具初始化函数====="+msg)
    },
    //图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    //向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    //实时预览函数
    realTime (data) {
      this.previews = data
    },
    //选择图片
    selectImg (e) {
      console.log("选择完成",e)
      let file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        message.error('图片类型要求：jpeg、jpg、png')
        return false
      }
      //转化为blob
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      //转化为base64
      reader.readAsDataURL(file)
    },
    //上传图片
    uploadImg (type) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const Instance = this;
      if (type === 'blob') {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(data=>{
          console.log("获取到blob数据",data)
          UploadUserHeadImg(data,"head.png").then(res=>{
            console.log("上传图片成功！",res)
            message.success("上传成功")
            Instance.$emit("uploadfinish",res.data)
          }).catch(err=>{
            console.log("上传图片出错！",err)
            message.error('上传图片出错！');
            if(err){
              if(err.message){
                notification.error({message:"上传图片出错！",description:err.message})
              }
            }
          })
        })
      }
    },
  },
})
</script>

<style scoped lang="scss">
.cropper-content{

  .cropper-box{
    .cropper{
      width: auto;
      height: 300px;
    }
    .show-preview .preview{
      overflow: hidden;
    }
  }
}
//   .show-preview{
//     flex: 1;
//     -webkit-flex: 1;
//     display: flex;
//     display: -webkit-flex;
//     justify-content: center;
//     .preview{
//       overflow: hidden;
//       border:1px solid #67c23a;
//       background: #cccccc;
//     }
//   }
// }
// .footer-btn{
//   margin-top: 30px;
//   display: flex;
//   display: -webkit-flex;
//   justify-content: flex-end;
//   .scope-btn{
//     display: flex;
//     display: -webkit-flex;
//     justify-content: space-between;
//     padding-right: 10px;
//   }
//   .upload-btn{
//     flex: 1;
//     -webkit-flex: 1;
//     display: flex;
//     display: -webkit-flex;
//     justify-content: center;
//   }
//   .btn {
//     outline: none;
//     display: inline-block;
//     line-height: 1;
//     white-space: nowrap;
//     cursor: pointer;
//     -webkit-appearance: none;
//     text-align: center;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     outline: 0;
//     -webkit-transition: .1s;
//     transition: .1s;
//     font-weight: 500;
//     padding: 8px 15px;
//     font-size: 12px;
//     border-radius: 3px;
//     color: #fff;
//     background-color: #409EFF;
//     border-color: #409EFF;
//     margin-right: 10px;
//   }
// }
</style>

