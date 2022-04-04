import axios from 'axios';
import { notification } from 'ant-design-vue'
import type { ShareMeDataModel,ShareMeRegistModel } from './ShareMeServerModel'
import {UserInfo} from '@/plugins/Account';


const BaseUrl=process.env.VUE_APP_SERVER

const ShareMeServer = axios.create({
    baseURL:BaseUrl,
    timeout: 10000
    // 'transformRequest' 允许在向服务器发送前，修改请求数据
    // transformRequest: [function (data) {
    //     // 对 data 做序列化处理
    //     return qs.stringify(data);
    // }],
})

ShareMeServer.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
ShareMeServer.interceptors.request.use(config => {
    // 若存在token则带token
    // const token = window.sessionStorage.getItem('token');
    // if (token) {
    //   if(config.headers){
    //     config.headers.Authorization = "Bearer "+ token;
    //   }
    // }
    if (UserInfo.auth) {
      if(config.headers){
        config.headers.Authorization = "Bearer "+ UserInfo.token;
      }
    }
    console.log("准备请求")
    // 放行
    return config;
}, err => {
    console.log("请求错误", err);
    notification.error({message:'请求错误',description:err})
    return err;
})

//------------------响应拦截-------------------//
//-------------对响应数据做点什么-------------//
ShareMeServer.interceptors.response.use(res => {
    //例：后端数据处理错误，并返回错误原因；前端获取错误原因并展示
    console.log("响应拦截=>", res);
    return res
}, err => {
    if(err.response){
        const statuscode=err.response.status
        const errmsg=err.response.data.message
        if(statuscode==401){
            notification.error({message:'401-错误请重试',description:errmsg})
        }else if(statuscode==500){
            notification.error({message:'500-错误请重试',description:errmsg})
        }else{
            notification.error({message:statuscode+'-错误请重试',description:errmsg})
        }
        return Promise.reject(err.response.data)
    }else{
        notification.error({message:'错误请重试',description:err.message})
        console.log("响应拦截错误完整信息=>",err)
        //throw err;
        return Promise.reject({success:false,message:err.message})
    }
})

// async function Login(name:string,password:string):Promise<ShareMeDataModel>{
//     try {
//         const data:ShareMeLoginModel={
//             name,
//             password
//         }
//         const res = await ShareMeServer.post("Account/Login", data);
//         sessionStorage.setItem("token",res.data.data)
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
//     //return BaseRequest().post(baseserve.funcs.login,{name:name,password:pwd})
// }
async function Register(name:string,password:string):Promise<ShareMeDataModel>{
    try{
        const data:ShareMeRegistModel={
            name,password
        }
        const res = await ShareMeServer.post("Account/Register",data)
        return Promise.resolve(res.data)
    }catch(err){
        return Promise.reject(err);
    }
}
async function GetSysSetting(name:string,key:string):Promise<ShareMeDataModel>{
    try{
        let requrl='Setting';
        if(name){
            requrl=requrl+'/'+ name;
        }
        if(key){
            requrl=requrl+'/'+key;
        }
        const res = await ShareMeServer.get(requrl)
        return Promise.resolve(res.data)
    }catch(err){
        return Promise.reject(err);
    }
}

function GetImageUrl(name:string):string{
    return process.env.VUE_APP_IMAGES+name
}

export {ShareMeServer,Register,GetSysSetting,GetImageUrl}