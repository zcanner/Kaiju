import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/hooks/getUser";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditProfile = () => {
  const { data, isLoading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [userinfo, setUserinfo] = useState({
    fullname: "",
    username: "",
    bio: "",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.userDoc) {
      setUserinfo({
        fullname: data.userDoc.fullname || "",
        username: data.userDoc.username || "",
        bio: data.userDoc.bio || "",
      });
      setImg(data.userDoc.profileimg);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserinfo({
      ...userinfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const updatedData: any = {};

    if (userinfo.fullname !== data?.userDoc.fullname) {
      updatedData.fullname = userinfo.fullname;
    }
    if (userinfo.username !== data?.userDoc.username) {
      updatedData.username = userinfo.username;
    }
    if (userinfo.bio !== data?.userDoc.bio) {
      updatedData.bio = userinfo.bio;
    }

    if (img !== data?.userDoc.profileimg) {
      updatedData.profileimg = img;
    }

    if (Object.keys(updatedData).length === 0) {
      alert("No changes to update!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/update",
        updatedData,
        {
          withCredentials: true,
        }
      );
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Profile updated!");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    } catch (error) {
      alert("An error occurred while updating the profile");
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return !isLoading ? (
    <>
      <div className="flex flex-col items-start w-full max-w-xl">
        <div className="p-2 max-h-40 items-center gap-4 ">
          <div className="flex h-32 gap-3">
            <div
              onClick={() => navigate(-1)}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <FaArrowLeft />
            </div>
          </div>
        </div>
        <div className="flex w-full p-4 gap-4 border-b-2 border-ghostbg">
          <div
            className="relative avatar flex items-center justify-center cursor-pointer"
            onClick={handleAvatarClick}
          >
            <div className="w-20 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full relative">
              <img
                src={
                  img || "https://avatars.githubusercontent.com/u/112796674?v=4"
                }
                alt="pfp"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full">
                <FaPencilAlt className="text-3xl" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImgChange}
              />
            </div>
          </div>
          <div className="w-full max-w-[77%]">
            <div className="content-center items-center">
              <h1 className="text-lg font-semibold flex items-center gap-2">
                {userinfo.fullname}
                {data?.userDoc.verified && <RiVerifiedBadgeFill />}
              </h1>
              <h3 className="label-text-alt text-sm break-words text-opacity-70">
                @{userinfo.username}
              </h3>
            </div>
            <div>
              <p className="break-words">{userinfo.bio}</p>
            </div>
          </div>
        </div>
      </div>
      {/* side bar */}

      <aside className="w-full max-w-80 md:w-72 p-4 border-l border-gray-700">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={userinfo.fullname}
              autoFocus={true}
              spellCheck={false}
              onChange={handleChange}
              className="input bg-transparent input-bordered w-full"
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={userinfo.username}
              onChange={handleChange}
              spellCheck={false}
              className="input bg-transparent input-bordered w-full"
              maxLength={30}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={userinfo.bio}
              onChange={handleChange}
              spellCheck={false}
              className="textarea w-full bg-transparent resize-none border border-ghostbg"
              rows={4}
              maxLength={160}
            ></textarea>
            <div className="text-right text-sm text-gray-500">
              {userinfo.bio.length}/160
            </div>
          </div>
          <button
            onClick={() => mutate()}
            className="btn btn-primary w-full mt-4"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </aside>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EditProfile;
