import Header from "./views/Header";
import Footer from "./views/Footer";
import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layouts;
