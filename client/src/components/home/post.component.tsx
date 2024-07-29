import {
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
  FaRegEye,
  FaRegBookmark,
  FaRegTrashAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = ({ post }: { post: any }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = (postID: string) => {
    mutate(postID);
  };

  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postID: string) => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/fun/delete/${postID}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.error) throw new Error(res.data.error);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const data = post?.posts;
  return (
    <>
      {data?.map((post: any) => (
        <div
          key={post._id}
          className="flex p-4 items-start gap-2 border border-gray-700 w-full max-w-xl "
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
              <p className="leading-5 pb-1 text-base">{post.content}</p>
            </div>
            {post.image && (
              <div className="py-2">
                <img
                  src={post.image}
                  className="w-full rounded-xl mx-auto object-contain"
                  alt="Selected Image"
                />
              </div>
            )}
            <div>
              <div className="flex gap-4 items-center">
                <div>
                  <div className="flex items-center gap-1 hover:text-error label-text">
                    <div className="btn btn-circle btn-sm hover:bg-error hover:bg-opacity-10 btn-ghost text-lg">
                      <FaRegHeart />
                    </div>
                    <span className="text-sm font-normal ">
                      {post.likes.length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 hover:text-success label-text">
                    <div className="btn btn-circle btn-sm btn-ghost hover:bg-success hover:bg-opacity-10  text-lg">
                      <FaRegComment />
                    </div>
                    <span className="text-sm font-normal ">
                      {post.comments.length}
                    </span>
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
      ))}
    </>
  );
};

export default Posts;
