export type UserInfoType = {
  avatar: string;
  nickname: string;
};

export type UpdateUserInfoResponse = {
  nickname: string;
  message: string;
  success: boolean;
};
