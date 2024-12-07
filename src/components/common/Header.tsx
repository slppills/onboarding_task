import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex gap-5">
      <Link to="/" className="p-2 border border-gray-400 rounded-md">
        메인 페이지
      </Link>
      <Link to="/login" className="p-2 border border-gray-400 rounded-md">
        로그인 페이지
      </Link>
      <Link to="/sign-up" className="p-2 border border-gray-400 rounded-md">
        회원가입 페이지
      </Link>
    </div>
  );
};

export default Header;
