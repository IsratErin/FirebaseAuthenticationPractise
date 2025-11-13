import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";

const Main = () => {
  return (
    <div>
      <Header />
      <hr />
      <Outlet />
    </div>
  );
};

export default Main;
