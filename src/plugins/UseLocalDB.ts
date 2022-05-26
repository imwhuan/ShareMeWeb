import type { LiveUserInfoModel } from "@/http/ShareMeServerModel";
import { GlobalData } from "@/plugins/GlobalData";
import { GetImageUrl } from "@/http/GetHttpUrl";
import { ref } from "vue";

const global = ref(GlobalData);

function AddUserData(key: string, val: string): void {
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.setItem(key, val);
  } else {
    sessionStorage.setItem(key, val);
  }
}

function GetUserData(key: string): string | null {
  if (localStorage.getItem("rememberme") == "1") {
    return localStorage.getItem(key);
  } else {
    return sessionStorage.getItem(key);
  }
}
/**
 * 将用户信息缓存到本地
 * @param data 用户信息
 */
function SaveUserInfo(data: LiveUserInfoModel): void {
  global.value.uname = data.name;
  global.value.uheadimg = GetImageUrl(data.userImageUrl);
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    sessionStorage.setItem("user", JSON.stringify(data));
  }
}
function UpdateUserHeadImg(data: LiveUserInfoModel): string {
  global.value.uheadimg = GetImageUrl(data.userImageUrl);
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  return data.userImageUrl;
}
function SaveUserToken(data: string): void {
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.setItem("token", data);
  } else {
    sessionStorage.setItem("token", data);
  }
}

function GetUserToken(): string | null {
  if (localStorage.getItem("rememberme") == "1") {
    return localStorage.getItem("token");
  } else {
    return sessionStorage.getItem("token");
  }
}

function GetUserInfo(): LiveUserInfoModel | null {
  if (localStorage.getItem("rememberme") == "1") {
    const infostr = localStorage.getItem("user");
    if (infostr) {
      return JSON.parse(infostr);
    } else {
      return null;
    }
  } else {
    const infostr = sessionStorage.getItem("user");
    if (infostr) {
      return JSON.parse(infostr);
    } else {
      return null;
    }
  }
}

/**
 * 清除用户本地信息
 */
function ClearUserData(): void {
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } else {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }
  global.value.uname = "";
  global.value.uheadimg = "";
}

function CheckUserLogined(): boolean {
  if (localStorage.getItem("rememberme") == "1") {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  } else {
    if (sessionStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
}

export {
  AddUserData,
  GetUserData,
  SaveUserInfo,
  SaveUserToken,
  GetUserInfo,
  GetUserToken,
  ClearUserData,
  CheckUserLogined,
  UpdateUserHeadImg,
};
