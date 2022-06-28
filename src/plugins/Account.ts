import { ShareMeServer } from "../http/ShareMeServer";
import type { ShareMeDataModel, ShareMeLoginModel } from "../http/ShareMeServerModel";
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
async function Login(name: string, password: string): Promise<boolean> {
  try {
    const data: ShareMeLoginModel = {
      name,
      password,
    };
    const res = await ShareMeServer.post("Account/Login", data);
    const resdata: ShareMeDataModel<any> = res.data;
    if (resdata.success) {
      UserInfo.id = resdata.data.id;
      UserInfo.name = resdata.data.name;
      UserInfo.token = resdata.data.token;
      UserInfo.roles = resdata.data.roles;
      UserInfo.desc = resdata.data.desc;
      UserInfo.auth = true;
    }
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(err);
  }
  //return BaseRequest().post(baseserve.funcs.login,{name:name,password:pwd})
}
export { UserInfo, Login };
