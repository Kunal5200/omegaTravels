import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import Header from "./header";

const Layout = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (router.pathname === "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  return (
    <div>
      {show && <Header />}
      {show && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
