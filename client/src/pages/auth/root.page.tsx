import { FaDiscord, FaGoogle } from "react-icons/fa6";
import logo from "/Logo_white_trans.svg";
import { useNavigate } from "react-router-dom";

const RootPage = () => {
  const navigate = useNavigate();

  const handleclick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
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
            className="mx-auto flex flex-col
						items-center max-w-md"
          >
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
            <div className="flex w-full flex-col border-opacity-50 max-w-xs">
              <div className="divider">or</div>
            </div>
            <div className="w-full max-w-xs p-1">
              <button
                onClick={(e) => handleclick("/signup", e)}
                className="btn w-full rounded-full max-w-xs btn-primary"
              >
                Create account
              </button>
            </div>
            <div className="max-w-xs w-full p-2">
              <p>Already have an account? </p>
              <button
                onClick={(e) => handleclick("/login", e)}
                className="btn w-full rounded-full max-w-xs btn-outline btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </header>
  );
};
export default RootPage;
