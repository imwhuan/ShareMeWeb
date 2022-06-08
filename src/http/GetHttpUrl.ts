function GetUpHeadImgUrl(): string {
  return process.env.VUE_APP_SERVER_LIVE + "User/PostUserHeadImg";
}

function GetPostIDCardImgUrl(): string {
  return process.env.VUE_APP_SERVER_LIVE + "User/PostIDCardImg";
}

function GetImageUrl(name: string): string {
  return process.env.VUE_APP_IMAGES + name;
}
export { GetUpHeadImgUrl, GetImageUrl, GetPostIDCardImgUrl };
