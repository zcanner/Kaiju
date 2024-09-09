import { useContext, useState } from 'react';
import { AuthContext } from '../../app';
import { useNavigate } from 'react-router-dom';

import { RiVerifiedBadgeFill } from 'react-icons/ri';

import CreatePost from '../home/createpost.component';
import InteractionBar from './interactionBar.component';
import ThreeDotOptions from './threeDotOptions.component';

const Posts = ({ post, isLoading, isRefetching }: any) => {
  const navigate = useNavigate();
  const { data: user } = useContext(AuthContext);
  const [postData, setPostData] = useState({
    content: '',
    image: '',
    postID: '',
  });
  const data = post?.posts;

  if (isLoading || isRefetching) {
    return (
      <div className='w-full max-w-xl h-[50%] content-center items-center'>
        <div className='flex justify-center'>
          <span className='loading loading-spinner text-primary'></span>
        </div>
      </div>
    );
  }

  console.log(postData);

  return (
    <>
      {data?.map((post: any) => (
        <div
          key={post._id}
          className='flex p-4 items-start gap-2 border-b border-ghostbg w-full max-w-xl'>
          <div className='avatar top-2'>
            <div className='w-10 rounded-full'>
              <img
                onClick={() => navigate(`/${post.author.username}`)}
                src={post.author.profileimg}
                alt='Profile'
                className='cursor-pointer'
              />
            </div>
          </div>
          <div className='w-full px-1'>
            <div className='flex gap-2 items-center'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{post.author.username}</span>
                {post.author.verified && <RiVerifiedBadgeFill />}
              </div>
              <span className='label-text'>
                •{' '}
                {new Date(post.createdAt).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  // weekday: "short",
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              {/* cut code was here */}
              <ThreeDotOptions setPostData={setPostData} post={post} user={user} />
            </div>

            <div id='content'>
              <p className='leading-normal pb-1 text-base'>{post.content}</p>
            </div>
            {post.image && (
              <div className='py-2'>
                <img
                  src={post.image}
                  loading='lazy'
                  className='w-full rounded-xl mx-auto object-contain'
                  alt=''
                />
              </div>
            )}
            <InteractionBar post={post} />
          </div>
        </div>
      ))}
      <dialog id='edit-post' className='modal'>
        <div className='modal-box bg-primarybg'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <CreatePost postData={postData} componentType={'edit'} user={user} />
          <p className='label-text'>Uploadig new image will replace older image.</p>
        </div>
      </dialog>
    </>
  );
};

export default Posts;
