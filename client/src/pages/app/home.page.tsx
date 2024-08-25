import { useEffect, useState } from "react";

import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/posts/posts.component";

import useUser from "../../lib/hooks/query/getUser";
import usePosts from "../../lib/hooks/query/usePosts";

const Home = () => {
  const { data } = useUser();
  // TODO : merge with usePost hook
  const [active, setActive] = useState("For You");
  const { data: post, refetch } = usePosts(active);

  let isActive = active === "For You";

  useEffect(() => {
    refetch();
  }, [active]);

  return (
    <div className="w-full max-w-xl">
      <div className="w-full max-w-xl items-center content-center border-ghostbg border-b cursor-pointer">
        <div className="flex gap-2">
          <div
            onClick={() => setActive("For You")}
            className={`text-center w-full hover:bg-ghostbg h-14 content-center active:bg-ghostbg ${
              isActive ? "border-b border-primary text-white" : "text-gray-300"
            }`}
          >
            <div className="items-center">
              <h1 className="text-lg font-medium p-2">For You</h1>
            </div>
          </div>
          <div
            onClick={() => setActive("following")}
            className={`text-center w-full hover:bg-ghostbg h-14 content-center active:bg-ghostbg ${
              !isActive ? "border-b border-primary text-white" : "text-gray-300"
            }`}
          >
            <div className="items-center">
              <h1 className="text-lg font-medium p-2">Following</h1>
            </div>
          </div>
        </div>
      </div>
      <CreatePost user={data} />
      <Posts post={post} />
    </div>
  );
};

export default Home;
