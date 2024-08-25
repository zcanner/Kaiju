import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaDiscord, FaGoogle } from "react-icons/fa6";
import logo from "/Logo_white_trans.svg";

interface FormData {
  identity: string;
  password: string;
}

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    identity: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // This is equivalent to credentials: "include"
          }
        );
        const data = response.data;
        if (data.error) {
          throw new Error(data.response.message);
        }

        return data;
      } catch (error) {
        const errorMessage = isAxiosError(error)
          ? error.response?.data
          : "An error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
      console.log("success");
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate(credentials);
  };

  return (
    <header className="container justify-center mx-auto content-center h-dvh">
      <div className="grid grid-cols-2">
        <section className="justify-center content-center">
          <div className="max-w-md mx-auto">
            <img className="w-full" src={logo} alt="logo" />
          </div>
        </section>
        <section className="content-center">
          <form className="mx-auto max-w-md">
            <div className="w-full max-w-xs p-1">
              <input
                type="text"
                placeholder="Username or Email"
                name="identity"
                onChange={handleChange}
                className="input bg-transparent input-bordered w-full max-w-xs"
              />
            </div>
            <div className="w-full max-w-xs p-1">
              <label className="form-control w-full max-w-xs">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="input bg-transparent input-bordered w-full max-w-xs"
                />
                <div className="label">
                  {isError && (
                    <p className="p-2 label-text text-error">{error.message}</p>
                  )}
                  <a className="link text-sm link-hover ml-auto">
                    Forgot password?
                  </a>
                </div>
              </label>
            </div>

            <div className="w-full max-w-xs p-1">
              <button
                onClick={handleSubmit}
                className="btn w-full rounded-full max-w-xs btn-primary"
              >
                Login
              </button>
            </div>
            <div className="flex w-full flex-col border-opacity-50 max-w-xs">
              <div className="divider">or</div>
            </div>
            <div className="w-full p-1 max-w-xs">
              <button className="btn w-full rounded-full max-w-xs btn-neutral">
                <FaGoogle className="text-xl" /> Google
              </button>
            </div>
            <div className="w-full p-1 max-w-xs">
              <button className="btn w-full rounded-full max-w-xs btn-neutral">
                <FaDiscord className="text-xl" /> Discord
              </button>
            </div>
            <div>
              <p>
                Don't have an account?{" "}
                <a className="link link-hover text-primary">Create account</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </header>
  );
};

export default LoginPage;
