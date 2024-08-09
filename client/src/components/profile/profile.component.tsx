import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useUser } from "../../lib/hooks/query/getUser";
import useAuth from "../../lib/hooks/query/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//TODO : update only components that need to be updated & fetch only the data that is needed use chashed data for other components
const Profile = () => {
  const { username } = useParams();
  const { data, isLoading, refetch, isRefetching } = useUser(username!);
  const { data: user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["follow", username],
    mutationFn: async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/user/updateFollowStatus?u=${username}`,
          { me: user?.user.username },
          {
            withCredentials: true,
          }
        );
        if (res.data.error) throw new Error(res.data.error);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    if (data?.userDoc.username) {
      document.title = `${data?.userDoc.username} - Kaiju`;
    } else {
      document.title = "Not Fond - Kaiju";
    }
  });

  const navigate = useNavigate();

  if (isLoading || isRefetching) {
    return (
      <div className="w-full max-w-xl items-center h-dvh content-center">
        <div className="flex justify-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="items-start w-full max-w-xl ">
      <div className="p-2 max-h-40 items-center gap-4 ">
        <div className="flex h-32 gap-3">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-ghost btn-circle"
          >
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
      <div className="flex p-4 gap-4 border-b border-ghostbg ">
        <div className="avatar items-center">
          <div className="w-20 h-28 sm:size-20 md:size-24 lg:size-28 rounded-full">
            <img
              src={data?.userDoc.profileimg}
              alt="pfp"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="content-center items-center">
            <h1 className="text-lg font-semibold flex items-center gap-2 break-words">
              {data?.userDoc.fullname}
              {data?.userDoc.verified && <RiVerifiedBadgeFill />}
              <div className="flex w-full ml-auto max-w-52">
                <div className="ml-auto">
                  {user?.user._id === data?.userDoc._id ? (
                    <button
                      onClick={() => navigate("/editprofile")}
                      className="btn text-xs btn-sm btn-circle w-24 bg-white text-black hover:bg-transparent hover:border-white hover:text-white"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="gap-2 flex">
                      <button
                        onClick={() => mutate()}
                        className="btn text-xs btn-sm btn-circle w-24 border-none btn-primary"
                      >
                        {data?.userDoc.followers.includes(user?.user._id)
                          ? "Unfollow"
                          : "Follow"}
                      </button>
                      <div className="btn btn-sm btn-ghost btn-circle">
                        <BsThreeDots />
                      </div>
                    </div>
                  )}
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
