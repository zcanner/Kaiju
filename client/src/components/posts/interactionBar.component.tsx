import {
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
  FaRegEye,
  FaRegBookmark,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const InteractionBar = ({ post }: any) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-4 items-center">
        <div>
          <div className="flex items-center gap-1 hover:text-error label-text">
            <div className="btn btn-circle btn-sm hover:bg-error hover:bg-opacity-10 btn-ghost text-lg">
              <FaRegHeart />
            </div>
            <span className="text-sm font-normal ">{post.likes.length}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 hover:text-success label-text">
            <div
              onClick={() => navigate(`/post/${post._id}`)}
              className="btn btn-circle btn-sm btn-ghost hover:bg-success hover:bg-opacity-10  text-lg"
            >
              <FaRegComment />
            </div>
            <span className="text-sm font-normal ">{post.comments.length}</span>
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
  );
};

export default InteractionBar;
