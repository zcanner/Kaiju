import { BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useUser } from "../../lib/hooks/query/getUser";
import useAuth from "../../lib/hooks/query/useAuth";

const Profile = () => {
  const { username } = useParams();
  const { data, isLoading, refetch } = useUser(username!);
  const { data: user } = useAuth();

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    document.title = `${data?.userDoc.username} - Kaiju`;
  });

  const navigate = useNavigate();

  if (isLoading) return <h1>Loading</h1>;

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
      <div className="flex p-4 gap-4 border-b-2 border-ghostbg ">
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
                      <button className="btn text-xs btn-sm btn-circle w-24 border-none btn-primary">
                        Follow
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
