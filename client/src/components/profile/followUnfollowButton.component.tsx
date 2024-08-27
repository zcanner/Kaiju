import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FollowUnfollowButton = ({ user, data, refetch }: any) => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["follow", username],
    mutationFn: async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/user/updateFollowStatus?u=${username}`,
          { me: user?.user.username },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] });
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="gap-2 flex">
      <button onClick={() => mutate()} className="min-w-24 pButton">
        {data?.userDoc.followers.includes(user?.user._id)
          ? "Unfollow"
          : "Follow"}
      </button>
      <div className="btn btn-sm btn-ghost btn-circle">
        <BsThreeDots />
      </div>
    </div>
  );
};

export default FollowUnfollowButton;
