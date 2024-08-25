import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
