import { CiImageOn } from "react-icons/ci";
import { useRef, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ user }: { user: any }): JSX.Element => {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<string | null>(null);

  const imgRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate();
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

  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/fun/create",
          {
            text,
            img,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.error) throw new Error(res.data.error);
      } catch (error) {
        console.error("Error creating post:", error);
        return null;
      }
    },
    onSuccess: () => {
      setText("");
      setImg(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.maxHeight = "80vh";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const firstName = user?.userDoc?.fullname.split(" ")[0];

  return (
    <div className="flex p-4 items-start gap-1 border border-gray-700 w-full max-w-xl ">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            onClick={() => navigate(`/${user?.userDoc?.username}`)}
            className="cursor-pointer"
            src={user?.userDoc?.profileimg}
            alt="Profile"
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="textarea w-full max-w-xl p-2 text-lg resize-none border-none bg-transparent focus:outline-none border-gray-800"
          placeholder={`What's on your mind, ${firstName}?`}
          value={text}
          role="combobox"
          aria-expanded="false"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        {img && (
          <div className="relative w-full p-2 mx-auto">
            {img && (
              <div className="relative w-full">
                <div className="absolute bg-gray-800 opacity-85 rounded-full top-1 right-1 flex justify-center items-center w-8 h-8 cursor-pointer hover:bg-gray-700">
                  <IoClose
                    className="text-white text-lg"
                    onClick={() => {
                      setImg(null);
                      if (imgRef.current) {
                        imgRef.current.value = "";
                      }
                    }}
                  />
                </div>

                <img
                  src={img}
                  className="w-full rounded-xl mx-auto object-contain"
                  alt="Selected Image"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between ">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current?.click()}
            />
          </div>
          <input
            type="file"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
            accept="image/*"
          />
          <button className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">Something went wrong</div>}
      </form>
    </div>
  );
};

export default CreatePost;
