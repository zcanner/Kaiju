import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async (postID: string) => {
      try {
        const res = await axios.delete(`http://localhost:3000/api/fun/delete/${postID}`, {
          withCredentials: true,
        });

        if (res.data.error) throw new Error(res.data.error);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

type updatedData = {
  postID: string;
  content: string;
};

const useEditPost = (updatedData: updatedData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/fun/update',
          {
            updatedData,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status !== 200) throw new Error(res.data.error);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', updatedData.postID] });
      (document.getElementById('edit-post') as HTMLDialogElement)?.close();
    },
  });
};

export { useDeletePost, useEditPost };
