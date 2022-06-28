interface ShareMeDataModel<T> {
  statusCode: number;
  message: string;
  data: T;
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

interface ApproveTitleModel {
  id: number;
  describe: string;
  anchorType: number;
  anchorTypeDesc: string;
  approveStatus: number;
  createTime: Date;
  userId: number;
  userName: string;
}
interface PageDataModel<T> {
  total: number;
  datas: Array<T>;
}

interface PostApproveActionModel {
  applyId: number;
  pass: boolean;
  msg: string;
}

export {
  ShareMeDataModel,
  ShareMeRegistModel,
  ShareMeLoginModel,
  ShareMeSysSetting,
  LiveUserInfoModel,
  LiveUserInfoBaseModel,
  AnchorApplyModel,
  ApproveTitleModel,
  PageDataModel,
  PostApproveActionModel,
};
