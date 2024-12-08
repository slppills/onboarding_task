import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { handleLogin } from "@/api/auth";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@/store/authStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("@/api/auth", () => ({
  handleLogin: jest.fn(),
}));

describe("Login Form", () => {
  it("submits the form with id and password", async () => {
    const user = userEvent.setup();
    const mockNavigate = jest.fn();
    const mockSetIsLoggedIn = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuthStore as jest.MockedFunction<typeof useAuthStore>).mockReturnValue({
      setIsLoggedIn: mockSetIsLoggedIn,
    });

    render(<LoginForm />);

    // 입력 필드 찾기
    const idInput = screen.getByLabelText("아이디");
    const passwordInput = screen.getByLabelText("비밀번호");
    const loginButton = screen.getByText("로그인");

    // 사용자 입력 시뮬레이션
    await user.type(idInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.click(loginButton);

    // 결과 확인
    expect(handleLogin).toHaveBeenCalledWith(
      { id: "testuser", password: "password123" },
      mockNavigate,
      mockSetIsLoggedIn
    );
  });
});
