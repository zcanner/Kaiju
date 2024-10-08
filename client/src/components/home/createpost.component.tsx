import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import useCreatePost from '../../lib/hooks/mutate/useCreatePost';
import { TPost } from '../../types/index.types';

import { CiImageOn } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { useEditPost } from '../../lib/hooks/mutate/postMutation';

type CreatePostProps = {
  user: any;
  componentType: 'create' | 'edit';
  postData: any;
};

const CreatePost = ({ user, componentType = 'create', postData }: CreatePostProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [data, setData] = useState<TPost>({
    content: '',
    image: '',
  });

  useEffect(() => {
    if (componentType === 'edit') {
      setData({ content: postData.content, image: postData.image });
    }
  }, [componentType, postData]);

  const imgRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();

  const updatedData = {
    postID: postData?.postID,
    content: data.content,
  };

  const { mutate: updatePostFN } = useEditPost(updatedData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (componentType === 'edit') return updatePostFN();
    else return mutate(data);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useCreatePost({
    onSuccess: () => {
      setData({ content: '', image: null });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  useEffect(() => {
    if (data.content.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      textareaRef.current.style.maxHeight = '80vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.content]);
  const userDoc = user?.user;
  const firstName = userDoc.fullname.split(' ')[0];

  return (
    <div className='flex p-4 items-start gap-1 border-b border-ghostbg w-full max-w-xl '>
      <div className='avatar'>
        <div className='w-10 rounded-full'>
          <img
            onClick={() => navigate(`/${userDoc.username}`)}
            className='cursor-pointer'
            src={userDoc.profileimg}
            alt='Profile'
          />
        </div>
      </div>
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className='textarea w-full max-w-xl p-2 text-lg resize-none border-none bg-transparent focus:outline-none border-gray-800'
          placeholder={`What's on your mind, ${firstName}?`}
          value={data.content}
          role='combobox'
          aria-expanded='false'
          maxLength={1000}
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
        />

        {data.image && (
          <div className='relative w-full p-2 mx-auto'>
            {data.image && (
              <div className='relative w-full'>
                <div className='absolute bg-gray-800 opacity-85 rounded-full top-1 right-1 flex justify-center items-center w-8 h-8 cursor-pointer hover:bg-gray-700'>
                  <IoClose
                    className='text-white text-lg'
                    onClick={() => {
                      setData({ ...data, image: null });
                      if (imgRef.current) {
                        imgRef.current.value = '';
                      }
                    }}
                  />
                </div>

                <img
                  src={data.image}
                  className='w-full rounded-xl mx-auto object-contain'
                  alt='Selected Image'
                />
              </div>
            )}
          </div>
        )}

        <div className='flex justify-between '>
          <div className='flex gap-1 items-center'>
            <CiImageOn className='w-6 h-6 cursor-pointer' onClick={() => imgRef.current?.click()} />
          </div>
          <input type='file' hidden ref={imgRef} onChange={handleImgChange} accept='image/*' />
          <button disabled={isDisabled} className='pButton'>
            {isPending ? 'Posting...' : 'Post'}
          </button>
        </div>
        {isError && <div className='text-red-500'>Something went wrong</div>}
      </form>
    </div>
  );
};

export default CreatePost;
