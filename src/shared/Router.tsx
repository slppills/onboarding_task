import Layout from "@/components/common/Layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import Signup from "@/pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
