import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useDeletePost from "../../lib/hooks/mutate/useDeletePost";

import InteractionBar from "./interactionBar.component";

const Posts = ({ post, isLoading, isRefetching }: any) => {
  const navigate = useNavigate();

  const handleClick = (postID: string) => {
    mutate(postID);
  };
  const { mutate } = useDeletePost();
  const data = post?.posts;

  if (isLoading || isRefetching) {
    return (
      <div className="w-full max-w-xl h-[50%] content-center items-center">
        <div className="flex justify-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.map((post: any) => (
        <div
          key={post._id}
          className="flex p-4 items-start gap-2 border-b border-ghostbg w-full max-w-xl"
        >
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
              <span className="label-text">
                •{" "}
                {new Date(post.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  // weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
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
                    <a
                      className="text-error"
                      onClick={() => handleClick(post._id)}
                    >
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
              <p className="leading-normal pb-1 text-base">{post.content}</p>
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
      ))}
    </>
  );
};

export default Posts;
