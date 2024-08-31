import { Link, useLocation } from "react-router-dom";

const Option = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const accounts = [
    { to: "account_info", label: "Account information" },
    { to: "password", label: "Change password" },
  ];

  const privacy = [{ to: "blocked_accounts", label: "Blocked users" }];

  const links = currentPath === "/settings/account" ? accounts : privacy;

  return (
    <div className="w-full">
      <div>
        <div className="p-2">
          <h1 className="text-xl font-semibold">
            {currentPath === "/settings/account"
              ? "Account Settings"
              : "Privacy and Safety Settings"}
          </h1>
        </div>
        <div className="my-2">
          <ul className="w-full">
            {links.map((link) => (
              <Link
                to={`${currentPath}/${link.to}`}
                className={`p-3 flex ${
                  location.pathname === `${currentPath}/${link.to}`
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
  );
};

export default Option;
