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
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { LuActivitySquare } from "react-icons/lu";

import { Link } from "react-router-dom";

const Navbar = ({ user }: any) => {
  return (
    <aside
      className="max-w-72 w-full sticky top-0 h-svh border-r border-gray-700"
      id="Sidebar"
    >
      <div className="h-svh">
        <div className="flex flex-col text-center">
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full font-medium text-2xl items-center"
              to={"/home"}
            >
              <div>
                <GoHome />
              </div>
              <div>
                <span>Home</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              to={""}
            >
              <div>
                <MdOutlineExplore />
              </div>
              <div>
                <span>Explore</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              to={""}
            >
              <div>
                <IoMdNotificationsOutline />
              </div>
              <div>
                <span>Notifications</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              to={""}
            >
              <div>
                <MdOutlineEmail />
              </div>
              <div>
                <span>Messages</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              to={""}
            >
              <div>
                <GiMonsterGrasp />
              </div>
              <div>
                <span>Slattern</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              to={""}
            >
              <div>
                <FaRegBookmark />
              </div>
              <div>
                <span>Saved</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              to={`/${user?.userDoc.username}`}
            >
              <div>
                <FaRegUser />
              </div>
              <div>
                <span>Profile</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              to={""}
            >
              <div>
                <LuActivitySquare />
              </div>
              <div>
                <span>Your activity</span>
              </div>
            </Link>
          </div>
          <div className="flex p-2 ">
            <Link
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              to={""}
            >
              <div>
                <IoSettingsOutline />
              </div>
              <div>
                <span>Settings</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
