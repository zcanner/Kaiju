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

const Navbar = () => {
  return (
    <aside
      className="max-w-72 w-full sticky top-0 h-svh border-r border-gray-700"
      id="Sidebar"
    >
      <div className="h-svh">
        <div className="flex flex-col text-center">
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full font-medium text-2xl items-center"
              href=""
            >
              <div>
                <GoHome />
              </div>
              <div>
                <span>Home</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              href=""
            >
              <div>
                <MdOutlineExplore />
              </div>
              <div>
                <span>Explore</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              href=""
            >
              <div>
                <IoMdNotificationsOutline />
              </div>
              <div>
                <span>Notifications</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl font-medium items-center"
              href=""
            >
              <div>
                <MdOutlineEmail />
              </div>
              <div>
                <span>Messages</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              href=""
            >
              <div>
                <GiMonsterGrasp />
              </div>
              <div>
                <span>Slattern</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              href=""
            >
              <div>
                <FaRegBookmark />
              </div>
              <div>
                <span>Saved</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              href=""
            >
              <div>
                <FaRegUser />
              </div>
              <div>
                <span>Profile</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              href=""
            >
              <div>
                <LuActivitySquare />
              </div>
              <div>
                <span>Your activity</span>
              </div>
            </a>
          </div>
          <div className="flex p-2 ">
            <a
              className="inline-flex btn btn-ghost rounded-full text-2xl items-center font-medium"
              href=""
            >
              <div>
                <IoSettingsOutline />
              </div>
              <div>
                <span>Settings</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
