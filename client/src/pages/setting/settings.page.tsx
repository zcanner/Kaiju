import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("/settings/account");
    }
  }, [location, navigate]);

  const links = [
    { to: "account", label: "Your account" },
    { to: "privacy_and_safety", label: "Privacy and safety" },
  ];

  return (
    <>
      <div className="w-full max-w-md">
        <div className="w-full border-r border-ghostbg h-dvh">
          <div className="flex gap-2 p-2">
            <div
              onClick={() => navigate("/home")}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <FaArrowLeft />
            </div>
            <div className="w-full max-w-sm">
              <h1 className="text-2xl font-semibold break-words">Settings</h1>
            </div>
          </div>

          <div className="my-2">
            <ul className="w-full">
              {links.map((link) => (
                <Link
                  to={`/settings/${link.to}`}
                  className={`p-3 flex ${
                    location.pathname === `/settings/${link.to}`
                      ? "bg-ghostbg border-r border-primary"
                      : "hover:bg-ghostbg"
                  }`}
                  key={link.to}
                >
                  <li>{link.label}</li>
                  <span className="ml-auto">{">"}</span>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-xl w-full border-r border-ghostbg">
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
