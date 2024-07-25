import { FaDiscord, FaGoogle } from "react-icons/fa6";
import logo from "/Logo_white_trans.svg";

const LoginPage = () => {
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
                className="input bg-transparent input-bordered w-full max-w-xs"
              />
            </div>
            <div className="w-full max-w-xs p-1">
              <label className="form-control w-full max-w-xs">
                <input
                  type="password"
                  placeholder="Password"
                  className="input bg-transparent input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <a className="link text-sm link-hover ml-auto">
                    Forgot password?
                  </a>
                </div>
              </label>
            </div>

            <div className="w-full max-w-xs p-1">
              <button className="btn w-full rounded-full max-w-xs btn-primary">
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
