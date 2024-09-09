import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFollowUnfollowMuatation = (user: any, refetch?: any, userToFollowUnfollow?: string) => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['follow', username],
    mutationFn: async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/user/updateFollowStatus`,
          { me: user?.user?.username },
          {
            withCredentials: true,
            params: {
              user: !username ? userToFollowUnfollow : username,
              requesttype: 'follow-unfollow',
            },
          }
        );
        if (res.data.error) throw new Error(res.data.error);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'status', username] });
      if (!refetch) return;
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useFollowUnfollowMuatation;
