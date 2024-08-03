import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../../lib/hooks/query/usePost";
import InteractionBar from "./interactionBar.component";

const Post = () => {
  const navigate = useNavigate();
  const { postID } = useParams();

  const { data, isLoading } = usePost(postID!);
  const post = data?.post;

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="gap-2 border border-gray-700 w-full max-w-xl ">
      <div className="p-3 items-center gap-4 ">
        <div className="flex gap-3">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-ghost btn-circle"
          >
            <FaArrowLeft />
          </div>
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-lg font-semibold break-words">Post</h1>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-start gap-2 ">
        <div className="avatar top-2">
          <div className="w-10 rounded-full">
            <img
              onClick={() => navigate(`/${post.author.username}`)}
              src={post.author.profileimg}
              alt="Profile"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full px-1">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author.username}</span>
              {post.author.verified && <RiVerifiedBadgeFill />}
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
                tabIndex={1}
                className="dropdown-content menu bg-primarybg border rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a className="text-error">
                    <FaRegTrashAlt />
                    Delete
                  </a>
                </li>
                <li>
                  <a>
                    <FaPencilAlt />
                    Edit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="content">
            <p className="leading-5 pb-1 text-base">{post.content}</p>
          </div>
          {post.image && (
            <div className="py-2">
              <img
                src={post.image}
                loading="lazy"
                className="w-full rounded-xl mx-auto object-contain"
                alt=""
              />
            </div>
          )}
          <InteractionBar post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
