import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../../lib/hooks/query/usePost";
import InteractionBar from "./interactionBar.component";
import ReplyCoponnent from "./comment/reply.componnent";
import { useUser } from "../../lib/hooks/query/getUser";

const Post = () => {
  const navigate = useNavigate();
  const { postID } = useParams();

  const { data, isLoading } = usePost(postID!);
  const post = data?.post;

  const { data: user } = useUser();

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="border-b border-ghostbg w-full max-w-xl ">
      <div className="p-3 items-center ">
        <div className="flex gap-2">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-ghost btn-circle"
          >
            <FaArrowLeft />
          </div>
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-2xl font-semibold break-words">Post</h1>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full">
          <div className="flex gap-2">
            <div>
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    onClick={() => navigate(`/${post.author.username}`)}
                    src={post.author.profileimg}
                    alt="Profile"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.author.fullname}</h3>
                {post.author.verified && <RiVerifiedBadgeFill />}
              </div>
              <h3 className="label-text">@{post.author.username}</h3>
            </div>
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
        </div>
        <div>
          <div className="p-2">
            <p>{post.content}</p>
          </div>
        </div>
        <div className="max-w-xl">
          <div>
            {post.image && (
              <img
                className="w-full rounded-2xl border-ghostbg border-2 p-1"
                src={post.image}
                alt="image"
              />
            )}
          </div>
        </div>
        <div>
          <div className="pt-2 px-2">
            <p className="label-text">
              {new Date(post.createdAt).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="px-2 my-2 border-y border-ghostbg">
          <InteractionBar post={post} />
        </div>
      </div>
      <ReplyCoponnent user={user} post={post} />
    </div>
  );
};

export default Post;
