import { GetUserInfo } from "@/plugins/UseLocalDB";
import { GetImageUrl } from "@/http/GetHttpUrl";

export const GlobalData = {
  uname: "",
  uheadimg: "",
};
const localData = GetUserInfo();
if (localData) {
  GlobalData.uname = localData.name;
  GlobalData.uheadimg = GetImageUrl(localData.userImageUrl);
}
