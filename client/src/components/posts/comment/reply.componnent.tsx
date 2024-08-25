import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { TPost } from "../../../types/index.types";
import useCreatePost from "../../../lib/hooks/mutate/useCreatePost";

const ReplyCoponnent = ({ user, post }: any) => {
  const [data, setData] = useState<TPost>({
    content: "",
    image: null,
    affiliatedPost: post._id,
    isReply: true,
  });
  const [isFocused, setFocused] = useState<boolean>(false);

  const imgRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleFocus = () => {
    setFocused(true);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.maxHeight = "60vh";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.content]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isError, isPending } = useCreatePost({
    onSuccess: () => {
      setData({ ...data, content: "", image: null });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const hadnleClick = () => {
    mutate(data);
  };

  return (
    <div className="border-b border-ghostbg">
      {isFocused ? (
        <div className="flex px-2 gap-2 items-start border-b border-ghostbg w-full max-w-xl ">
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img
                onClick={() => navigate(`/${user?.userDoc?.username}`)}
                className="cursor-pointer"
                src={user?.userDoc?.profileimg}
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <textarea
              ref={textareaRef}
              className="textarea w-full max-w-xl p-2 h-12 text-lg resize-none border-none bg-transparent focus:outline-none border-gray-800"
              placeholder={`What is your thought on this, ${
                user?.userDoc?.fullname.split(" ")[0]
              }?`}
              value={data.content}
              role="combobox"
              autoFocus={true}
              aria-expanded="false"
              onChange={(e) => {
                setData({ ...data, content: e.target.value });
              }}
            />
            {data.image && (
              <div className="relative w-full p-2 mx-auto">
                {data.image && (
                  <div className="relative w-full">
                    <div className="absolute bg-gray-800 opacity-85 rounded-full top-1 right-1 flex justify-center items-center w-8 h-8 cursor-pointer hover:bg-gray-700">
                      <IoClose
                        className="text-white text-lg"
                        onClick={() => {
                          setData({ ...data, image: null });
                          if (imgRef.current) {
                            imgRef.current.value = "";
                          }
                        }}
                      />
                    </div>

                    <img
                      src={data.image}
                      className="w-full rounded-xl mx-auto object-contain"
                      alt="Selected Image"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between my-2">
              <div className="flex px-2 content-center items-center">
                <CiImageOn
                  onClick={() => imgRef.current?.click()}
                  className="size-6 cursor-pointer"
                />
              </div>
              <div className="content-center items-center">
                <input
                  ref={imgRef}
                  onChange={handleImgChange}
                  type="file"
                  hidden
                  accept="image/*"
                />
                <button onClick={hadnleClick} className="pButton">
                  {isPending ? "Replying..." : "Reply"}
                </button>
              </div>
            </div>
            {isError && <div className="text-error">Something went wrong</div>}
          </div>
        </div>
      ) : (
        <div
          onFocus={handleFocus}
          className="flex px-2 pb-4 items-center gap-2"
        >
          <div className="w-auto">
            <div className="avatar">
              <div className="w-11 rounded-full">
                <img
                  onClick={() => navigate(`/${user?.userDoc?.username}`)}
                  className="cursor-pointer"
                  src={user?.userDoc?.profileimg}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            className="textarea w-full max-w-xl p-2 h-12 text-lg resize-none border-none bg-transparent focus:outline-none border-gray-800"
            placeholder={`What is your thought on this, ${
              user?.userDoc?.fullname.split(" ")[0]
            }?`}
            role="combobox"
            aria-expanded="false"
          />
          <button className="pButton">Reply</button>
        </div>
      )}
    </div>
  );
};

export default ReplyCoponnent;
