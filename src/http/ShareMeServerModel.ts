interface ShareMeDataModel {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;
  tag: any;
}

interface ShareMeRegistModel {
  /**
   * 账户类型 1手机 2邮箱
   */
  accountType: number;
  name: string;
  password: string;
  account: string;
  code: string;
  remember: boolean;
}

interface ShareMeLoginModel {
  name: string;
  password: string;
}

interface ShareMeSysSetting {
  sysName: string;
  sysKey: string;
  sysValue: string;
}
interface LiveUserInfoModel {
  id: number;
  name: string;
  phone: string;
  createtime: string;
  userImageUrl: string;
}
export {
  ShareMeDataModel,
  ShareMeRegistModel,
  ShareMeLoginModel,
  ShareMeSysSetting,
  LiveUserInfoModel,
};
