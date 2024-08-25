import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// TODO : use this to fetch user posts on user profile page.
const usePosts = (query?: string, pID?: string) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/fun/get-posts?t=${query}&pID=${pID}`,
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
  });
};

export default usePosts;
