import { useContext, useState } from "react";
import { AuthContext } from "../../app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AccountInfo = () => {
	const { data } = useContext(AuthContext);
	const [toggle, setToggle] = useState(data.user?.private);
	const date = new Date(data.user?.createdAt);
	const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} , ${date.toLocaleTimeString(
		[],
		{ hour: "numeric", minute: "numeric", hour12: true }
	)}`;

	const handleToggle = async () => {
		try {
			const res = await axios.post("http://localhost:3000/api/setting/togglePrivatePublic", {
				isPrivate: toggle,
			}, {
				withCredentials: true,
			})

			if (res.data.error)
				throw new Error(res.data.error);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}

	console.log("user data", data.user?.private);
	console.log("toggle ", toggle);

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: handleToggle,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["status"] });
		}
	})

	const handleToggleChange = async () => {
		mutate();
		setToggle(!toggle)
	};

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
							defaultChecked={data.user?.private}
							onChange={handleToggleChange}
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
