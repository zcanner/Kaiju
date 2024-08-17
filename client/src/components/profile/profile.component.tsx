import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";

import { useUser } from "../../lib/hooks/query/getUser";
import useAuth from "../../lib/hooks/query/useAuth";

import Posts from "../posts/posts.component";

//TODO : update only components that need to be updated & fetch only the data that is needed use chashed data for other components
const Profile = () => {
  const [reply, setReply] = useState(false);
  const { username } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isRefetching } = useUser(username!);
  const { data: user } = useAuth();

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
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: post,
    refetch: Rposts,
    isLoading: loading,
    isRefetching: refetching,
  } = useQuery({
    queryKey: ["userPost"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/user/posts/${data?.userDoc._id}${
          reply ? "?reply=true" : ""
        }`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error("Error in fetching user posts");
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [username]);

  useEffect(() => {
    Rposts();
  }, [username, Rposts, reply]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userPost"] });
  }, [username, data]);

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
    <>
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
        <div className="flex p-4 gap-4">
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
                <p className="font-semibold ">
                  {data?.userDoc.followers.length}
                </p>
                <p className="label-text text-opacity-70 ">Followers</p>
              </a>
              <a className="flex gap-2 items-center cursor-pointer break-words">
                <p className="font-semibold ">
                  {data?.userDoc.following.length}
                </p>
                <p className="label-text text-opacity-70 ">Following</p>
              </a>
            </div>
            <div>
              <p>{data?.userDoc.bio}</p>
            </div>
          </div>
        </div>
        {/* post and reply */}
        <div className="w-full max-w-xl items-center content-center border-ghostbg border-b cursor-pointer">
          <div className="flex gap-2">
            <div
              onClick={() => setReply(false)}
              className={`text-center w-full hover:bg-ghostbg h-10 content-center active:bg-ghostbg ${
                !reply && "border-b border-primary"
              }`}
            >
              <div className="items-center">
                <h1 className="text-lg font-semibold p-2">Posts</h1>
              </div>
            </div>
            <div
              onClick={() => setReply(true)}
              className={`text-center w-full hover:bg-ghostbg h-10 content-center active:bg-ghostbg ${
                reply && "border-b border-primary"
              }`}
            >
              <div className="items-center">
                <h1 className="text-lg font-semibold p-2">Replies</h1>
              </div>
            </div>
          </div>
        </div>
        <Posts isLoading={loading} isRefetching={refetching} post={post} />
      </div>
    </>
  );
};

export default Profile;
