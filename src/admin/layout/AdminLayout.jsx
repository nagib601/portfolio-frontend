import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    // Correct redirect path
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin/dashboard",       icon: "📊", label: "Dashboard"       },
    { to: "/admin/manage-projects", icon: "🗂️", label: "Manage Projects" },
    { to: "/admin/viewers",         icon: "👁️", label: "Viewers"         },
  ];

  return (
    <div className="min-h-screen flex bg-base-200">
      <aside className="w-64 bg-base-100 shadow-xl flex flex-col p-5 fixed h-full z-50">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          <p className="text-base-content/50 text-xs mt-1">Portfolio Management</p>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isActive
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-base-200 text-base-content"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error btn-sm mt-4 w-full"
        >
          🚪 Logout
        </button>
      </aside>
      <main className="flex-1 ml-64 p-6 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;