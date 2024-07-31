import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postID: string) => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/fun/delete/${postID}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.error) throw new Error(res.data.error);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default useDeletePost;
