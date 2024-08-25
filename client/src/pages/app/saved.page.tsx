import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Posts from "../../components/posts/posts.component";
import useAuth from "../../lib/hooks/query/useAuth";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const navigate = useNavigate();
  const { data: user } = useAuth();

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["saved"],
    queryFn: async () => {
      // Fetch
      const res = await axios.get(
        `http://localhost:3000/api/fun/get-saved/${user.user._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200)
        throw new Error("An error occurred while fetching saved posts");

      return res.data;
    },
  });

  // Extract the post array from the data object
  const dPosts = data?.[0]?.post || [];
  const posts = {
    posts: dPosts,
  };
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
            <h1 className="text-2xl font-semibold break-words">Saved</h1>
            <p className="label-text text-opacity-70 break-words">
              {data?.[0]?.post.length} saved posts
            </p>
          </div>
        </div>
      </div>
      <Posts isLoading={isLoading} isRefetching={isRefetching} post={posts} />
    </div>
  );
};

export default Saved;
