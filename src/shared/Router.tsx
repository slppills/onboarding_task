import Layout from "@/components/common/Layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import Mypage from "@/pages/Mypage";
import Signup from "@/pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <Mypage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
