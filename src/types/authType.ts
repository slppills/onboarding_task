export type LoginFormdata = {
  id: string;
  password: string;
};

export type SignupFormdata = LoginFormdata & {
  nickname: string;
};
