import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (username?: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        username
          ? `http://localhost:3000/api/user/?user=${username}`
          : "http://localhost:3000/api/user/",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },
  });
};
