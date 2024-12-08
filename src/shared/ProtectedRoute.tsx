import { useAuthStore } from "@/store/authStore";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (children) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
