import React, { useState } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { RiUserFollowLine } from 'react-icons/ri';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineBlock, MdOutlinedFlag } from 'react-icons/md';

import { useDeletePost } from '../../lib/hooks/mutate/postMutation';
import useBlockUserMutation from '../../lib/hooks/mutate/blockUnblockUser';
import useFollowUnfollowMuatation from '../../lib/hooks/mutate/followUnfollow';

type ThreeDotOptionsProps = {
  post: any;
  user: any;
  setPostData?: React.Dispatch<
    React.SetStateAction<{ content: string; image: string; postID: string }>
  >;
};

const ThreeDotOptions = ({ post, user, setPostData }: ThreeDotOptionsProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { mutate: deleteFun } = useDeletePost();

  const handleShowOption = (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    setPosition({ x, y });
  };

  const handlePostDelete = (postID: string) => {
    return () => deleteFun(postID);
  };

  const showPostEditDialoge = (content: string, image: any, postID: string) => {
    return () => {
      if (setPostData) setPostData({ content, image, postID });
      (document.getElementById('edit-post') as HTMLDialogElement)?.showModal();
    };
  };

  const { mutate: blockUserFN } = useBlockUserMutation();
  const handleBlockUser = (username: string) => {
    return () => {
      blockUserFN(username);
    };
  };

  const { mutate: followUnfollowFN } = useFollowUnfollowMuatation(user, null, post.author.username);
  const handleFollowUnfollow = () => {
    followUnfollowFN();
  };

  const handleReportPost = () => {
    console.log('Reported');
  };

  const handleNotIntrested = () => {
    console.log('Not interested');
  };

  const isOwnPost = post.author._id === user.user._id;

  const ownPostOptions = [
    { name: 'Delete', icon: <FaRegTrashAlt />, onClick: handlePostDelete(post._id) },
    {
      name: 'Edit post',
      icon: <FaPencilAlt />,
      onClick: showPostEditDialoge(post.content, post.image, post._id),
    },
  ];

  const otherUserPostOptions = [
    {
      name: 'Not interested',
      icon: <HiOutlineEmojiSad />,
      onClick: handleNotIntrested,
    },
    {
      name: `${user.user.blockedUsers.includes(post.author._id) ? 'Unblock' : 'Block'} @${
        post.author.username
      }`,
      icon: <MdOutlineBlock />,
      onClick: handleBlockUser(post.author.username),
    },
    {
      name: `${user.user.following.includes(post.author._id) ? 'Unfollow' : 'Follow'} @${
        post.author.username
      }`,
      icon: <RiUserFollowLine />,
      onClick: handleFollowUnfollow,
    },
    {
      name: 'Report post',
      icon: <MdOutlinedFlag />,
      onClick: handleReportPost,
    },
  ];

  const options = isOwnPost ? ownPostOptions : otherUserPostOptions;

  return (
    <div className='dropdown dropdown-end ml-auto'>
      <div
        tabIndex={0}
        onClick={handleShowOption}
        role='button'
        className='btn btn-sm btn-ghost btn-circle'>
        <BsThreeDots />
      </div>
      <div
        tabIndex={0}
        style={{ top: position.y, right: `cal(100vw - position.x)` }}
        className='dropdown-content menu bg-primarybg border border-ghostbg rounded-box z-[1] w-52 p-2 shadow'>
        {options.map((option, index) => (
          <div key={index} className='p-2 hover:bg-ghostbg rounded-lg select-none cursor-pointer '>
            <div
              onClick={option.onClick}
              className={`${
                option.name === 'Delete' ? 'text-error ' : ''
              }flex gap-2 items-center active:text-opacity-55`}>
              {option.icon}
              <span>{option.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDotOptions;
