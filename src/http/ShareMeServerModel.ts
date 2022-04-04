interface ShareMeDataModel{
  statusCode:number;
  message:string;
  data:any;
  success:boolean;
}

interface ShareMeRegistModel{
  name:string,
  password:string
}

interface ShareMeLoginModel{
  name:string,
  password:string
}

interface ShareMeSysSetting{
  sysName:string,
  sysKey:string,
  sysValue:string
}
export {ShareMeDataModel,ShareMeRegistModel,ShareMeLoginModel,ShareMeSysSetting}