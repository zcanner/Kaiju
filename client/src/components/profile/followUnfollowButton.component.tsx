import { BsThreeDots } from 'react-icons/bs';
import useFollowUnfollowMuatation from '../../lib/hooks/mutate/followUnfollow';

const FollowUnfollowButton = ({ user, data, refetch }: any) => {
  const { mutate } = useFollowUnfollowMuatation(user, refetch);
  return (
    <div className='gap-2 flex'>
      <button onClick={() => mutate()} className='min-w-24 pButton'>
        {data?.userDoc.followers.includes(user?.user._id) ? 'Unfollow' : 'Follow'}
      </button>
      <div className='btn btn-sm btn-ghost btn-circle'>
        <BsThreeDots />
      </div>
    </div>
  );
};

export default FollowUnfollowButton;
