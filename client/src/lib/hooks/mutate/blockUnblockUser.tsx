import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useBlockUserMutation() {
  return useMutation({
    mutationFn: async (username: string) => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/user/block?u=${username}`,
          null,
          {
            withCredentials: true,
          }
        );

        if (res.status !== 200) throw new Error("Failed to block user");

        return res.data;
      } catch (error) {
        console.error("Error in blockUser:", error);
      }
    },
  });
}

export default useBlockUserMutation;
