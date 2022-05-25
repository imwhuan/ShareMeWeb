import type { LiveUserInfoModel } from "@/http/ShareMeServerModel";

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

function SaveUserInfo(data: string): void {
  if (localStorage.getItem("rememberme") == "1") {
    localStorage.setItem("user", data);
  } else {
    sessionStorage.setItem("user", data);
  }
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
}

export {
  AddUserData,
  GetUserData,
  SaveUserInfo,
  SaveUserToken,
  GetUserInfo,
  GetUserToken,
  ClearUserData,
};
