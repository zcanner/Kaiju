import { useContext } from 'react';
import { AuthContext } from '../../app';

import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import usePost from '../../lib/hooks/query/usePost';
import InteractionBar from './interactionBar.component';
import ReplyCoponnent from './comment/reply.componnent';
import ThreeDotOptions from './threeDotOptions.component';

const Post = () => {
  const navigate = useNavigate();
  const { postID } = useParams();

  const { data, isLoading } = usePost(postID!);
  const post = data?.post;

  const { data: user } = useContext(AuthContext);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <div className='p-3 items-center '>
        <div className='flex gap-2'>
          <div onClick={() => navigate(-1)} className='btn btn-sm btn-ghost btn-circle'>
            <FaArrowLeft />
          </div>
          <div className='w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
            <h1 className='text-2xl font-semibold break-words'>Post</h1>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <div className='w-full'>
          <div className='flex gap-2'>
            <div>
              <div className='avatar'>
                <div className='w-12 rounded-full'>
                  <img
                    onClick={() => navigate(`/${post.author.username}`)}
                    src={post.author.profileimg}
                    alt='Profile'
                    className='cursor-pointer'
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h3 className='font-semibold'>{post.author.fullname}</h3>
                {post.author.verified && <RiVerifiedBadgeFill />}
              </div>
              <h3 className='label-text'>@{post.author.username}</h3>
            </div>
            <ThreeDotOptions post={post} user={user} />
          </div>
        </div>
        <div>
          <div className='p-2'>
            <p>{post.content}</p>
          </div>
        </div>
        <div className='max-w-xl'>
          <div>
            {post.image && (
              <img
                className='w-full rounded-2xl border-ghostbg border-2 p-1'
                src={post.image}
                alt='image'
              />
            )}
          </div>
        </div>
        <div>
          <div className='pt-2 px-2'>
            <p className='label-text'>
              {new Date(post.createdAt).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className='px-2 my-2 border-y border-ghostbg'>
          <InteractionBar post={post} />
        </div>
      </div>
      <ReplyCoponnent user={user} post={post} />
    </>
  );
};

export default Post;
