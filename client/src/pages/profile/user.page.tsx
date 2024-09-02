import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useUser from "../../lib/hooks/query/getUser";

import Posts from "../../components/posts/posts.component";
import Profile from "../../components/profile/profile.component";

const UserPage = () => {
	const [reply, setReply] = useState(false);
	const { username } = useParams();

	const { data, isLoading, refetch, isRefetching } = useUser(username!);

	// fetch userr posts
	const {
		data: post,
		refetch: Rposts,
		isLoading: loading,
		isRefetching: refetching,
	} = useQuery({
		queryKey: ["userPost", username],
		queryFn: async () => {
			const res = await axios.get(
				`http://localhost:3000/api/user/posts/${data?.userDoc._id}${reply ? "?reply=true" : ""
				}`,
				{
					withCredentials: true,
					params: {
						requesttype: "posts",
						user: username,
					}
				}
			);
			if (res.status !== 200) throw new Error("Error in fetching user posts");
			return res.data;
		},
	});

	useEffect(() => {
		Rposts();
	}, [username, Rposts, reply]);

	useEffect(() => {
		if (data?.userDoc.username) {
			document.title = `${data?.userDoc.username} - Kaiju`;
		} else {
			document.title = "Not Fond - Kaiju";
		}
	});

	return (
		<div className="items-start w-full max-w-xl ">
			<Profile
				setReply={setReply}
				reply={reply}
				isLoading={isLoading}
				isRefetching={isRefetching}
				refetch={refetch}
				data={data}
			/>
			<Posts isLoading={loading} isRefetching={refetching} post={post} />
		</div>
	);
};

export default UserPage;
