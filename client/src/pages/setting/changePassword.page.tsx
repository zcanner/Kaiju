import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";

const ChangePassword = () => {
	const [form, setForm] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/setting/updatePassword",
				form,
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			const data = response.data;
			if (data.error) {
				throw new Error(data.response.message);
			}

			return data;
		} catch (error) {
			const errorMessage = isAxiosError(error)
				? error?.response?.data.error
				: "An error occurred";
			throw new Error(errorMessage);

		}
	}

	const { mutate, error } = useMutation({
		mutationFn: handleSubmit,
	})

	const isPasswordsMismatch =
		form.newPassword === form.confirmPassword
		&& form.newPassword.length > 0
		&& form.confirmPassword.length > 0
		&& form.oldPassword.length > 0;

	return (
		<div className="w-full">
			<div className="flex flex-col gap-2 p-2 border-b border-ghostbg">
				<div className="p-2">
					<h1 className="text-xl font-semibold">Change your password</h1>
				</div>
				<div className="p-2">
					<input
						type="password"
						name="oldPassword"
						placeholder="Current password"
						onChange={handleChange}
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
						name="newPassword"
						onChange={handleChange}
						placeholder="New password"
						className="input bg-transparent input-bordered w-full"
					/>
				</div>
				<div className="p-2">
					<input
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						placeholder="Conform password"
						className="input bg-transparent input-bordered w-full"
					/>
				</div>
				<div className="p-2 w-full">

					<button disabled={!isPasswordsMismatch} onClick={() => mutate()} className="btn btn-md bg-primary w-full bg-opacity-30 text-orange-200 text-opacity-45 hover:bg-primary hover:bg-opacity-35">
						Save
					</button>
					{error && <p className="text-red-500 text-sm p-2">{error.message}</p>}
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
