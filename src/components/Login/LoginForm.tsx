import { handleLogin } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthStore();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "id":
        setFormData({ ...formData, id: e.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: e.target.value });
        break;
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(formData, navigate, setIsLoggedIn);
  };

  return (
    <form className="flex flex-col gap-5 items-center" onSubmit={onFormSubmit}>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="userId">아이디</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="아이디를 4자 이상 입력하세요"
          value={formData.id}
          onChange={handleFormChange}
          className="p-2 border rounded-lg border-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 4자 이상 입력하세요"
          value={formData.password}
          onChange={handleFormChange}
          className="p-2 border rounded-lg border-gray-400"
        />
      </div>

      <button className="py-3 px-6 bg-gray-200 rounded-lg">로그인</button>
    </form>
  );
};

export default LoginForm;
