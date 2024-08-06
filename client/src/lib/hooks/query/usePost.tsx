import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePost = (postID: string) => {
  return useQuery({
    queryKey: ["posts", postID],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/fun/get/${postID}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },
  });
};

export default usePost;
