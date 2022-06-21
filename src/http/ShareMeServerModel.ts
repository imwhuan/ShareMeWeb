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
  age: number;
  yanZhi: number;
  name: string;
  describe: string;
  address: string;
  sex: number;
  phone: string;
  createTime: string;
  userImageUrl: string;
}

interface LiveUserInfoBaseModel {
  id: number;
  age: number;
  name: string;
  describe: string;
  address: string;
  sex: number;
  yanZhi: number;
}

interface AnchorApplyModel {
  describe: string;
  iDCardImgBefore: string;
  iDCardImgBehind: string;
  anchorType: number;
  anchorTypeDesc: string;
}

export {
  ShareMeDataModel,
  ShareMeRegistModel,
  ShareMeLoginModel,
  ShareMeSysSetting,
  LiveUserInfoModel,
  LiveUserInfoBaseModel,
  AnchorApplyModel,
};
