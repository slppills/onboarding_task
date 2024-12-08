import { LoginFormdata, SignupFormdata } from "@/types/authType";
import axios from "axios";
import { Cookies } from "react-cookie";
import { NavigateFunction } from "react-router-dom";

const cookies = new Cookies();
const API_URL = "https://moneyfulpublicpolicy.co.kr";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleRegister = async (formData: SignupFormdata, navigate: NavigateFunction) => {
  try {
    const response = await instance.post("/register", formData);
    if (response.data.success) {
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  } catch (error) {
    if (error.response.status === 409) {
      alert("이미 가입된 아이디입니다.");
    } else {
      console.error("회원가입 에러 : ", error);
    }
  }
};

export const handleLogin = async (
  formData: LoginFormdata,
  navigate: NavigateFunction,
  setIsLoggedIn: (loggedIn: boolean) => void
) => {
  try {
    const response = await instance.post("/login?expiresIn=10m", formData);
    if (response.status === 200) {
      cookies.set("access_token", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      setIsLoggedIn(true);
      alert("로그인이 완료되었습니다. 메인페이지로 이동합니다.");
      navigate("/");
    }
  } catch (error) {
    alert(`로그인 에러 : ${error.response.data.message}`);
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const response = await instance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 정보 불러오기 에러 : ", error.response.message);
  }
};

export const updateUserInfo = async (token: string, avatar: string, nickname: string) => {
  try {
    const response = await instance.patch(
      "/profile",
      { avatar: [avatar], nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 에러 : ", error.response.message);
  }
};
