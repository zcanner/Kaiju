import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { username } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${username}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("An error occurred while fetching user data");
        }

        return await res.json();
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Return null or a default object to avoid undefined
        return null;
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  return (
    <div className="items-start w-full max-w-xl ">
      <div className="p-2 max-h-40 items-center gap-4 ">
        <div className="flex h-32">
          <div className="btn btn-sm btn-ghost btn-circle">
            <FaArrowLeft />
          </div>
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-lg font-semibold break-words">
              {data?.userDoc.username}
            </h1>
            <p className="label-text text-opacity-70 break-words">0</p>
          </div>
        </div>
      </div>
      <div className="flex p-4 gap-4 border-b-2 border-ghostbg ">
        <div className="avatar">
          <div className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full">
            <img
              src={
                data?.userDoc.profileimg ||
                "https://avatars.githubusercontent.com/u/112796674?v=4"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex gap-2 items-center">
            <h1 className="text-lg font-semibold break-words">
              {data?.userDoc.fullname}
            </h1>
            <h1 className="label-text-alt text-sm break-words text-opacity-70">
              @{data?.userDoc.username}
            </h1>
            <div className="ml-auto btn btn-sm btn-ghost btn-circle">
              <BsThreeDots />
            </div>
          </div>
          <div className="flex gap-4">
            <a className="flex gap-2 items-center cursor-pointer break-words">
              <p className="font-semibold ">{data?.userDoc.followers.length}</p>
              <p className="label-text text-opacity-70 ">Followers</p>
            </a>
            <a className="flex gap-2 items-center cursor-pointer break-words">
              <p className="font-semibold ">{data?.userDoc.following.length}</p>
              <p className="label-text text-opacity-70 ">Following</p>
            </a>
          </div>
          <div>
            <p>{data?.userDoc.bio}</p>
          </div>
          <div className="py-2 my-2 px-1 flex gap-3 w-full">
            <button className="btn btn-circle border-none btn-primary w-[50%]">
              Follow
            </button>
            <button className="btn btn-circle ghost bg-transparent w-[50%]">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
