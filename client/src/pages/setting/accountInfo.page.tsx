import { useContext } from "react";
import { AuthContext } from "../../app";

const AccountInfo = () => {
  const { data } = useContext(AuthContext);
  const date = new Date(data.user?.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} , ${date.toLocaleTimeString(
    [],
    { hour: "numeric", minute: "numeric", hour12: true }
  )}`;

  return (
    <div className="w-full">
      <div className="p-2">
        <h1 className="text-xl font-semibold p-2">Account Information</h1>
      </div>
      <div className="border-b border-ghostbg">
        <div className="p-2">
          <div className="p-2">
            <h3>Username</h3>
            <p className="label-text">@{data.user?.username}</p>
          </div>
          <div className="p-2">
            <h3>Email</h3>
            <p className="label-text">{data.user?.email}</p>
          </div>
          <div className="p-2">
            <h3>Verified</h3>
            <p className="label-text">{data.user?.verified ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div>
          <label className="label cursor-pointer">
            <span className="">Private account</span>
            <input
              type="checkbox"
              className="toggle toggle-primary [--tglbg:#171311]"
              defaultChecked
            />
          </label>
          <p className="label-text p-2">
            When your account is public, anyone can see your posts. Even if they
            dont have an kaiju account.
          </p>
          <p className="label-text p-2">
            When your account is private, only people you approve can see your
            posts.
          </p>
        </div>
        <div className="p-2">
          <h3>Account creation</h3>
          <p className="label-text">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
