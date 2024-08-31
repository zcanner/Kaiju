const BlockedUsers = () => {
  return (
    <div>
      <div className="p-2 border-b border-ghostbg">
        <h1 className="text-xl font-semibold p-2">Blocked accounts</h1>
        <p className="label-text p-2">
          When you block someone, that person won't be able to follow or see
          your posts you, and you won't see notifications from them.
        </p>
      </div>
      <div>
        {/* <div className="p-2">
          <h3 className="text-lg font-semibold">No blocked accounts</h3>
          <p className="label-text">You haven't blocked anyone yet.</p>
        </div> */}
        <div className="p-2">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <img
                src="Profile picture url"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <h3 className="text-md font-semibold">Full Name</h3>
                <p className="label-text">@username</p>
              </div>
            </div>
            <button className="btn btn-error btn-sm text-white rounded-full">
              Unblock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;
