import React from "react";
import "./styles.scss";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { Outlet } from "react-router-dom";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AuthLayout;
