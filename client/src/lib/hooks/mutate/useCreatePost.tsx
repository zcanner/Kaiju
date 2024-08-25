import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { TPost } from "../../../types/index.types";

type UseCreatePostOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const useCreatePost = ({ onSuccess, onError }: UseCreatePostOptions = {}) => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: TPost) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/fun/create",
          {
            data,
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
    onSuccess,
    onError,
  });
};

export default useCreatePost;
