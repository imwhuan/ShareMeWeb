import ShareMeServer from "./LiveWebServer";
import type { ShareMeDataModel, ShareMeRegistModel } from "./ShareMeServerModel";
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
      SaveUserInfo(JSON.stringify(resData.data));
    }
    return Promise.resolve(resData);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { UserInfo, RegisterSendVertifyCode, Register, LoginSendVertifyCode, Login };
