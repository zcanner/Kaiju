import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
  FaRegEye,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useAuth from "../../lib/hooks/query/useAuth";
import { TPost } from "../../types/index.types";

const InteractionBar = ({ post }: { post: TPost }) => {
  const [postID] = useState(post._id);
  const queryClient = useQueryClient();
  const { data: user } = useAuth();

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/fun/toggleLike`,
        { postID: postID },
        {
          withCredentials: true,
        }
      );
      if (res.data.error) throw new Error(res.data.error);

      post.likes = post.likes ?? [];

      if (res.status === 201) post.likes.length += 1;

      if (res.status === 204) post.likes.length -= 1;

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["like", postID],
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: save } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `http://localhost:3000/api/fun/save`,
        { postID },
        { withCredentials: true }
      );
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["saved"] });
    },
  });

  const handleClick = () => {
    console.log(postID);
    mutate();
  };

  const navigate = useNavigate();
  return (
    <div className="py-3">
      <div className="flex gap-4 items-center">
        <div>
          <div className="flex items-center gap-1 hover:text-error label-text">
            <div
              onClick={handleClick}
              className="btn btn-circle btn-sm hover:bg-error hover:bg-opacity-10 btn-ghost text-lg"
            >
              {post.likes?.includes(user?.user._id) ? (
                <FaHeart className="fill-error" />
              ) : (
                <FaRegHeart />
              )}
            </div>
            <span className="text-sm font-normal ">
              {post.likes?.length || 0} {/* update it later  */}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 hover:text-success label-text">
            <div
              onClick={() =>
                navigate(`/post/${post.author?.username}/${post._id}`)
              }
              className="btn btn-circle btn-sm btn-ghost hover:bg-success hover:bg-opacity-10  text-lg"
            >
              <FaRegComment />
            </div>
            <span className="text-sm font-normal ">{post.comments}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 hover:text-warning label-text">
            <div className="btn btn-circle btn-sm btn-ghost hover:bg-warning hover:bg-opacity-10  text-lg">
              <FaRegShareSquare />
            </div>
            <span className="text-sm font-normal ">0</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 hover:text-purple-500 label-text">
            <div className="btn btn-circle btn-sm btn-ghost hover:bg-purple-500 hover:bg-opacity-10 text-lg">
              <FaRegEye />
            </div>
            <span className="text-sm font-normal ">{post.views}</span>
          </div>
        </div>
        <div className="ml-auto">
          <div className="hover:text-blue-500 label-text">
            <div
              onClick={() => save()}
              className="btn btn-circle btn-xs btn-ghost hover:bg-blue-500 hover:bg-opacity-10 text-lg"
            >
              <FaRegBookmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionBar;
