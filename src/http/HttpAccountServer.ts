import ShareMeServer from "./LiveWebServer";
import type {
  ShareMeDataModel,
  ShareMeRegistModel,
  LiveUserInfoBaseModel,
} from "./ShareMeServerModel";
import { SaveUserInfo, SaveUserToken } from "@/plugins/UseLocalDB";

/**
 * 用户信息
 */
const UserInfo = {
  name: "",
  id: 0,
  desc: "",
  roles: [] as Array<string>,
  token: "",
  auth: false,
};
/**
 * 请求发送验证码
 * @param data 请求数据
 * @returns 请求结果
 */
async function RegisterSendVertifyCode(data: ShareMeRegistModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.post("Register/SendVerifyCode", data);
    console.log("SendPhoneCode请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function Register(data: ShareMeRegistModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.post("Register/Register", data);
    console.log("SendPhoneCode请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
/**
 * 登录时请求发送验证码
 * @param data 请求数据
 * @returns 请求结果
 */
async function LoginSendVertifyCode(data: ShareMeRegistModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.post("Login/SendVerifyCode", data);
    console.log("SendPhoneCode请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
/**
 * 登录
 * @param data
 * @returns
 */
async function Login(data: ShareMeRegistModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.post("Login/Login", data);
    console.log("SendPhoneCode请求结果", res);
    const resData: ShareMeDataModel = res.data;
    if (resData.success) {
      SaveUserToken(resData.tag);
      SaveUserInfo(resData.data);
    }
    return Promise.resolve(resData);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * 获取当前登录用户信息
 * @returns 用户信息
 */
async function GetCurrentUser(): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.get("User/GetCurrentUserInfo");
    console.log("GetCurrentUser请求结果", res);
    const resData: ShareMeDataModel = res.data;
    if (resData.success) {
      SaveUserInfo(resData.data);
    }
    return Promise.resolve(resData);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * 修改当前登录用户信息
 * @param data 修改后的信息
 * @returns
 */
async function PutCurrentUserBase(data: LiveUserInfoBaseModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.put("User/PutCurrentUserInfoBase", data);
    console.log("GetCurrentUser请求结果", res);
    const resData: ShareMeDataModel = res.data;
    if (resData.success) {
      SaveUserInfo(resData.data);
    }
    return Promise.resolve(resData);
  } catch (err) {
    return Promise.reject(err);
  }
}

// async function UploadUserHeadImg(data: LiveUserInfoBaseModel): Promise<ShareMeDataModel> {
//   try {
//     const res = await ShareMeServer.put("User/PutCurrentUserInfoBase", data);
//     console.log("GetCurrentUser请求结果", res);
//     const resData: ShareMeDataModel = res.data;
//     if (resData.success) {
//       SaveUserInfo(resData.data);
//     }
//     return Promise.resolve(resData);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

export {
  UserInfo,
  RegisterSendVertifyCode,
  Register,
  LoginSendVertifyCode,
  Login,
  GetCurrentUser,
  PutCurrentUserBase,
};
