import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useBlockUserMutation from "../../lib/hooks/mutate/blockUnblockUser";

const BlockedUsers = () => {
  async function getBlockedUsers() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/setting/blockedUsers",
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) throw new Error("Error fetching blocked users");

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data } = useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUsers,
  });

  const { mutate } = useBlockUserMutation();

  const blockedUser = data?.blockedUsers;
  console.log(blockedUser);

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
        {blockedUser?.length === 0 ? (
          <div className="p-2">
            <h3 className="text-lg font-semibold">No blocked accounts</h3>
            <p className="label-text">You haven't blocked anyone yet.</p>
          </div>
        ) : (
          <div className="p-2">
            {blockedUser?.map((user: any) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center">
                  <img
                    src={user.profileimg}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="text-md font-semibold">{user.fullname}</h3>
                    <p className="label-text">@{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => mutate(user.username)}
                  className="btn btn-error btn-sm text-white rounded-full"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedUsers;
