import { useQuery } from "@tanstack/react-query";

const usePosts = (query?: string, pID?: string) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/api/fun/get-posts?t=${query}&pID=${pID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      return res.json();
    },
  });
};

export default usePosts;
