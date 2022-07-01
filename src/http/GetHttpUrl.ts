function GetUpHeadImgUrl(): string {
  return process.env.VUE_APP_SERVER_LIVE + "api/User/PostUserHeadImg";
}

function GetPostIDCardImgUrl(): string {
  return process.env.VUE_APP_SERVER_LIVE + "api/User/PostIDCardImg";
}

function GetImageUrl(name: string): string {
  return process.env.VUE_APP_IMAGES + name;
}

function GetLiveChatRoomHubUrl(token: string | null): string {
  let huburl = "livehub/chatroom";
  if (token) {
    huburl += "?token=" + token;
  }
  return process.env.VUE_APP_SERVER_LIVE + huburl;
}
export { GetUpHeadImgUrl, GetImageUrl, GetPostIDCardImgUrl, GetLiveChatRoomHubUrl };
