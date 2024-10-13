import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface DashboardProps {
  className: string;
}

const dashboardItems = [
  {
    icon: "ion:image-outline",
    title: "Images",
    link: "/",
  },
  {
    icon: "octicon:upload-16",
    title: "Upload",
    link: "/upload",
  },
  {
    icon: "line-md:account",
    title: "Account",
    link: "/",
  },
];

function Dashboard({ className }: DashboardProps) {
  const { logout, user } = useAuthContext();

  return (
    <aside
      aria-label="sidebar"
      aria-controls="default-sidebar"
      className={`${className} bg-white font-urbanist w-[290px] px-6 shadow-md rounded-md transition-transform -translate-x-full sm:translate-x-0`}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <a className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main hover:text-white transition duration-150 cursor-pointer">
          <img src="avatar.png" className="rounded-full" alt="profile image" />
          <span className="ml-4 font-semibold tracking-wide">
            {user.username}
          </span>
        </a>
      </div>

      <div className="wrapper pt-6">
        <ul>
          {dashboardItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.link}
                className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main hover:text-white transition duration-150 cursor-pointer"
              >
                <i>
                  <Icon icon={item.icon} className="hover:text-white text-2xl" />
                </i>
                <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <div
              onClick={logout}
              className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main hover:text-white transition duration-150 cursor-pointer"
            >
              <i>
                <Icon icon={"uil:signout"} className="hover:text-white text-2xl" />
              </i>
              <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Dashboard;
