import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (username?: string) => {
	return useQuery({
		queryKey: ["user", username],
		queryFn: async () => {
			const res = await axios.get("http://localhost:3000/api/user/", {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				params: {
					requesttype: "user",
					user: username
				},
			}
			);
			if (res.data.error) throw new Error(res.data.error);
			return res.data;
		},
		retry: false,
		throwOnError: true,
	});
};

export default useUser;
