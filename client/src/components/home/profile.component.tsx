import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useUser } from "../../lib/hooks/getUser";

const Profile = () => {
  const { username } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/?user=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.error) throw new Error(res.data.error);

        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
  });

  const { data: user } = useUser();

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    document.title = `${data?.userDoc.username} - Kaiju`;
  });

  return (
    <div className="items-start w-full max-w-xl ">
      <div className="p-2 max-h-40 items-center gap-4 ">
        <div className="flex h-32 gap-3">
          <div className="btn btn-sm btn-ghost btn-circle">
            <FaArrowLeft />
          </div>
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-lg font-semibold break-words">
              {data?.userDoc.username}
            </h1>
            <p className="label-text text-opacity-70 break-words">
              {data?.userDoc.posts.length} posts
            </p>
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
          <div className="content-center">
            <h1 className="text-lg font-semibold flex items-center gap-2 break-words">
              {data?.userDoc.fullname}
              {data?.userDoc.verified && <RiVerifiedBadgeFill />}
              <div className="ml-auto btn btn-sm btn-ghost btn-circle">
                <BsThreeDots />
              </div>
            </h1>
            <h1 className="label-text-alt text-sm break-words text-opacity-70">
              @{data?.userDoc.username}
            </h1>
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
          <div className="py-2 flex gap-3 w-full">
            {user?._id === data?.userDoc._id ? (
              <>
                <button className="btn btn-md btn-circle border-none btn-primary w-[35%]">
                  Follow
                </button>
                <button className="btn btn-md btn-circle ghost bg-transparent w-[35%]">
                  Message
                </button>
              </>
            ) : (
              <button className="btn btn-circle btn-md w-full bg-white text-black max-w-40 hover:bg-transparent hover:border-white hover:text-white">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
