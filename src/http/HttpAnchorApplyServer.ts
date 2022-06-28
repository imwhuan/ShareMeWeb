import ShareMeServer from "./LiveWebServer";
import type {
  AnchorApplyModel,
  ShareMeDataModel,
  ApproveTitleModel,
  PageDataModel,
  PostApproveActionModel,
} from "@/http/ShareMeServerModel";

async function PostApply(data: AnchorApplyModel): Promise<ShareMeDataModel<any>> {
  try {
    const res = await ShareMeServer.post("AnchorApply", data);
    console.log("PostApply请求结果", res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
async function GetApplyTitleList(
  whereMap: Map<string, any> | null,
  pageIndex: number,
  pageSize: number
): Promise<ShareMeDataModel<PageDataModel<ApproveTitleModel>>> {
  try {
    const data = Object.create(null);
    if (whereMap) {
      whereMap.forEach((v, k) => {
        data[k] = v;
      });
    }
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

async function PostApproveAction(data: PostApproveActionModel): Promise<ShareMeDataModel<string>> {
  try {
    const res = await ShareMeServer.post("AnchorApprove/PostApproveAction", data);
    console.log("PostApproveAction请求结果", res);
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
export { PostApply, GetApplyTitleList, PostApproveAction };
