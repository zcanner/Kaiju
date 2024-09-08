import { useContext, useState } from 'react';
import { AuthContext } from '../../app';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AccountInfo = () => {
  const { data } = useContext(AuthContext);
  const [toggle, setToggle] = useState(data.user?.private);
  const [cardentials, setCardentials] = useState({ email: '', password: '' });
  const date = new Date(data.user?.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} , ${date.toLocaleTimeString(
    [],
    { hour: 'numeric', minute: 'numeric', hour12: true }
  )}`;

  const handleToggle = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/setting/togglePrivatePublic',
        {
          isPrivate: toggle,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.error) throw new Error(res.data.error);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status'] });
    },
  });

  const handleToggleChange = async () => {
    mutate();
    setToggle(!toggle);
  };

  const handleEmailDialoge = () => {
    (document.getElementById('edit-email') as HTMLDialogElement)?.showModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardentials({ ...cardentials, [e.target.name]: e.target.value });
  };

  const handleEmailUpdate = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/setting/updateEmail', cardentials, {
        withCredentials: true,
      });
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: updaetEmailFn } = useMutation({
    mutationFn: handleEmailUpdate,
    onSuccess: () => {
      (document.getElementById('edit-email') as HTMLDialogElement)?.close();
    },
  });

  return (
    <div className='w-full'>
      <div className='p-2'>
        <h1 className='text-xl font-semibold p-2'>Account Information</h1>
      </div>
      <div className='border-b border-ghostbg'>
        <div className='p-2'>
          <div className='p-2 hover:bg-ghostbg cursor-pointer'>
            <h3>Username</h3>
            <p className='label-text'>@{data.user?.username}</p>
          </div>
          <div onClick={handleEmailDialoge} className='p-2 hover:bg-ghostbg cursor-pointer'>
            <h3>Email</h3>
            <div className='flex justify-between items-center'>
              <p className='label-text'>{data.user?.email}</p>
              <span>{'>'}</span>
            </div>
          </div>
          <div className='p-2 hover:bg-ghostbg cursor-pointer'>
            <h3>Verified</h3>
            <p className='label-text'>{data.user?.verified ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <div>
          <label className='label cursor-pointer'>
            <span className=''>Private account</span>
            <input
              type='checkbox'
              className='toggle toggle-primary [--tglbg:#171311]'
              defaultChecked={data.user?.private}
              onChange={handleToggleChange}
            />
          </label>
          <p className='label-text p-2'>
            When your account is public, anyone can see your posts. Even if they dont have an kaiju
            account.
          </p>
          <p className='label-text p-2'>
            When your account is private, only people you approve can see your posts.
          </p>
        </div>
        <div className='p-2'>
          <h3>Account creation</h3>
          <p className='label-text'>{formattedDate}</p>
        </div>
      </div>
      <dialog id='edit-email' className='modal'>
        <div className='modal-box bg-primarybg'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <h1 className='text-xl font-medium'>Update Email</h1>
          <div className='flex flex-col gap-2 p-2'>
            <input
              type='text'
              placeholder='New Email'
              name='email'
              onChange={handleChange}
              className='input bg-transparent input-bordered w-full max-w-lg'
            />
            <input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Pawssword'
              className='input bg-transparent input-bordered w-full max-w-lg'
            />
            <button onClick={() => updaetEmailFn()} className='btn btn-primary'>
              Update
            </button>
          </div>
          <p className='label-text'>Uploadig new image will replace older image.</p>
        </div>
      </dialog>
    </div>
  );
};

export default AccountInfo;
