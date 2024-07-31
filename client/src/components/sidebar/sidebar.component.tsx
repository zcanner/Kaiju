import { GoHome, GoHomeFill } from "react-icons/go";
import {
  MdOutlineExplore,
  MdExplore,
  MdOutlineEmail,
  MdEmail,
} from "react-icons/md";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { GiMonsterGrasp } from "react-icons/gi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaRegUser, FaUser } from "react-icons/fa6";
// import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { LuActivitySquare } from "react-icons/lu";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }: any) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { to: "/home", defaultIcon: GoHome, activeIcon: GoHomeFill, label: "Home" },
    {
      to: "/explore",
      defaultIcon: MdOutlineExplore,
      activeIcon: MdExplore,
      label: "Explore",
    },
    {
      to: "/notifications",
      defaultIcon: IoMdNotificationsOutline,
      activeIcon: IoMdNotifications,
      label: "Notifications",
    },
    {
      to: "/messages",
      defaultIcon: MdOutlineEmail,
      activeIcon: MdEmail,
      label: "Messages",
    },
    {
      to: "/slattern",
      defaultIcon: GiMonsterGrasp,
      activeIcon: GiMonsterGrasp,
      label: "Slattern",
    },
    {
      to: "/saved",
      defaultIcon: FaRegBookmark,
      activeIcon: FaBookmark,
      label: "Saved",
    },
    {
      to: `/${user?.userDoc.username}`,
      defaultIcon: FaRegUser,
      activeIcon: FaUser,
      label: "Profile",
    },
    {
      to: "/activity",
      defaultIcon: LuActivitySquare,
      activeIcon: LuActivitySquare,
      label: "Your activity",
    },
    {
      to: "/settings",
      defaultIcon: IoSettingsOutline,
      activeIcon: IoSettingsSharp,
      label: "Settings",
    },
  ];

  return (
    <aside
      className="max-w-72 w-full sticky top-0 h-svh border-r border-gray-700"
      id="Sidebar"
    >
      <div className="h-svh">
        <div className="flex flex-col text-center">
          {links.map((link) => (
            <div className="flex p-2" key={link.to}>
              <Link
                className="inline-flex btn btn-ghost rounded-full font-medium text-2xl items-center"
                to={link.to}
              >
                <div>
                  {currentPath === link.to ? (
                    <link.activeIcon />
                  ) : (
                    <link.defaultIcon />
                  )}
                </div>
                <div>
                  <span>{link.label}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
