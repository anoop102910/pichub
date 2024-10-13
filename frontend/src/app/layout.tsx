import { Outlet } from "react-router-dom";
import { QueryProvider } from "@/context/QueryContext";
import Navbar from "@/app/home/Navbar";

function HomeLayout() {
  return (
    <QueryProvider>
      <Navbar />
      <Outlet />
    </QueryProvider>
  );
}

export default HomeLayout;