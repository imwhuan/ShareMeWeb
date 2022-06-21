import ShareMeServer from "./LiveWebServer";
import type { AnchorApplyModel, ShareMeDataModel } from "@/http/ShareMeServerModel";

async function PostApply(data: AnchorApplyModel): Promise<ShareMeDataModel> {
  try {
    const res = await ShareMeServer.post("AnchorApply", data);
    console.log("PostApply请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function GetApplyTitleList(
  whereMap: Map<string, any>,
  pageIndex: number,
  pageSize: number
): Promise<ShareMeDataModel> {
  try {
    const data = Object.create(null);
    whereMap.forEach((v, k) => {
      data[k] = v;
    });
    const res = await ShareMeServer.post(
      `AnchorApprove/GetAllApplyTitleList?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      data
    );
    console.log("PostApply请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
export { PostApply, GetApplyTitleList };
