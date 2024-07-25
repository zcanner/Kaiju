import {
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
  FaRegEye,
  FaRegBookmark,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const Posts = () => {
  return (
    <>
      <div className="flex p-4 items-start gap-2 border border-gray-700 w-full max-w-xl ">
        <div className="avatar">
          <div className="w-9 rounded-full">
            <img
              src={
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Profile"
            />
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <div>
              <span className="font-medium">Username</span>
            </div>
            <span className="label-text">• 7h</span>
            <div className="dropdown dropdown-top dropdown-end ml-auto">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-ghost btn-circle"
              >
                <BsThreeDots />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>

          <div id="content">
            <p className="leading-5 text-base">
              Hey Guys this is is my first post on kaiju! a picture of natures
              beauty taken by me.
            </p>
          </div>
          <div className="py-2">
            <img
              src={
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.photographylife.com%2Fwp-content%2Fuploads%2F2014%2F09%2FNikon-D750-Image-Samples-2.jpg&f=1&nofb=1&ipt=79061b0f1cca1b997156b179347a2a1f7fcdad74fb87fa2904454a74b4316a45&ipo=images"
              }
              className="w-full rounded-xl mx-auto object-contain"
              alt="Selected Image"
            />
          </div>
          <div>
            <div className="flex gap-4 items-center">
              <div>
                <div className="flex items-center gap-1 hover:text-error label-text">
                  <div className="btn btn-circle btn-sm hover:bg-error hover:bg-opacity-10 btn-ghost text-lg">
                    <FaRegHeart />
                  </div>
                  <span className="text-sm font-normal ">233K</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 hover:text-success label-text">
                  <div className="btn btn-circle btn-sm btn-ghost hover:bg-success hover:bg-opacity-10  text-lg">
                    <FaRegComment />
                  </div>
                  <span className="text-sm font-normal ">80K</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 hover:text-warning label-text">
                  <div className="btn btn-circle btn-sm btn-ghost hover:bg-warning hover:bg-opacity-10  text-lg">
                    <FaRegShareSquare />
                  </div>
                  <span className="text-sm font-normal ">2K</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 hover:text-purple-500 label-text">
                  <div className="btn btn-circle btn-sm btn-ghost hover:bg-purple-500 hover:bg-opacity-10 text-lg">
                    <FaRegEye />
                  </div>
                  <span className="text-sm font-normal ">20M</span>
                </div>
              </div>
              <div className="ml-auto">
                <div className="hover:text-blue-500 label-text">
                  <div className="btn btn-circle btn-xs btn-ghost hover:bg-blue-500 hover:bg-opacity-10 text-lg">
                    <FaRegBookmark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
