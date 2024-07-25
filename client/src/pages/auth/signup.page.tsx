import { FaDiscord, FaGoogle } from "react-icons/fa6";
import logo from "/Logo_white_trans.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios, { isAxiosError } from "axios";

// Define the type for form data
type FormData = {
  username: string;
  email: string;
  password: string;
  fullname: string;
};

const SignupPage = () => {
  const [formdata, setFormdata] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });

  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
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

        console.log(data);
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
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    formdata.fullname = `${name.firstname} ${name.lastname}`;
    mutate(formdata);
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
          <form
            className="mx-auto max-w-md"
            onClick={(e) => e.preventDefault()}
          >
            <div className="w-full max-w-xs p-1">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="input bg-transparent input-bordered w-full max-w-xs"
              />
            </div>
            <div className="w-full max-w-xs p-1">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="input bg-transparent input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex w-full gap-2 max-w-xs p-1">
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  onChange={handleNameChange}
                  className="input bg-transparent input-bordered w-full max-w-xs"
                />
              </div>
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={handleNameChange}
                  className="input bg-transparent input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="w-full max-w-xs p-1">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="input bg-transparent input-bordered w-full max-w-xs"
              />
              {isError && (
                <p className="p-2 label-text text-error">{error.message}</p>
              )}
            </div>
            <div className="w-full max-w-xs px-1 py-2">
              <button
                onClick={handleSubmit}
                className="btn w-full rounded-full max-w-xs btn-primary"
              >
                Next
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
                Already have an account?{" "}
                <a className="link link-hover text-primary">Login</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </header>
  );
};
export default SignupPage;
