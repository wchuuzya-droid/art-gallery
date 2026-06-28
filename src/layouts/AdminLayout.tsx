import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Palette, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const sidebarLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin", label: "Manage Art", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-purple-50">
      <aside className="w-64 bg-white border-r border-purple-100 flex flex-col">
        <div className="p-6 border-b border-purple-100">
          <Link
            to="/"
            className="flex items-center gap-2 text-purple-700 font-bold text-lg no-underline"
          >
            <Palette className="w-6 h-6" />
            <span>ArtVista</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-purple-100 text-purple-700"
                    : "text-purple-400 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-purple-100 space-y-2">
          {user && (
            <p className="px-4 text-xs text-purple-400 truncate">
              {user.email}
            </p>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-purple-400 hover:bg-purple-50 hover:text-purple-600 no-underline transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer border-0 bg-transparent transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
