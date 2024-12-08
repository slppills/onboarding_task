import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [cookies, removeCookie] = useCookies(["access_token"]);

  const onLogout = () => {
    setIsLoggedIn(false);
    removeCookie("access_token", { path: "/" });
    alert("로그아웃 되었습니다. 홈 페이지로 이동합니다.");
    navigate("/");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = cookies.access_token;
      if (token && typeof token === "string") {
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = tokenData.exp * 1000; // accessToken의 만료 시간을 10분으로 설정

        if (Date.now() >= expirationTime) {
          onLogout();
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 10000); // 10초마다 accessToken이 만료되었는지 확인

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.access_token]);

  return (
    <div className="flex gap-5">
      <Link to="/" className="p-2 border border-gray-400 rounded-md">
        메인 페이지
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="mypage" className="p-2 border border-gray-400 rounded-md">
            마이 페이지
          </Link>
          <button onClick={onLogout} className="p-2 border border-gray-400 rounded-md">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="p-2 border border-gray-400 rounded-md">
            로그인 페이지
          </Link>
          <Link to="/sign-up" className="p-2 border border-gray-400 rounded-md">
            회원가입 페이지
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
