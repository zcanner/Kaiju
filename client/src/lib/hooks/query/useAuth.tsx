import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAuthStatus = async () => {
  const res = await axios.get("http://localhost:3000/api/auth/status", {
    withCredentials: true,
  });

  if (res.status !== 200) {
    throw new Error("Unauthorized");
  }
  return res.data;
};

const useAuth = () => {
  return useQuery({
    queryKey: ["status"],
    queryFn: fetchAuthStatus,
  });
};

export default useAuth;
