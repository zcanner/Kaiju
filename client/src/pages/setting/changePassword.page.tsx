const ChangePassword = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 p-2 border-b border-ghostbg">
        <div className="p-2">
          <h1 className="text-xl font-semibold">Change your password</h1>
        </div>
        <div className="p-2">
          <input
            type="password"
            name="password"
            placeholder="Current password"
            className="input bg-transparent input-bordered w-full"
          />
          <a className="text-primary text-sm" href="/">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="p-2">
        <div className="p-2">
          <input
            type="password"
            name="password"
            placeholder="New password"
            className="input bg-transparent input-bordered w-full"
          />
        </div>
        <div className="p-2">
          <input
            type="password"
            name="password"
            placeholder="Conform password"
            className="input bg-transparent input-bordered w-full"
          />
        </div>
        <div className="p-2 w-full">
          <button className="btn btn-md bg-primary w-full bg-opacity-30 text-orange-200 text-opacity-45 hover:bg-primary hover:bg-opacity-35">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
