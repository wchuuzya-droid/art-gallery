import { Outlet, Link, useLocation } from "react-router-dom";
import { Palette } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function PublicLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/exhibit", label: "Exhibit" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-purple-700 font-bold text-xl no-underline"
          >
            <Palette className="w-7 h-7" />
            <span>ArtVista</span>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium no-underline transition-colors ${
                  pathname === link.to
                    ? "text-purple-700"
                    : "text-purple-400 hover:text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                to="/dashboard"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-purple-600 text-white no-underline hover:bg-purple-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-purple-600 text-white no-underline hover:bg-purple-700 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-purple-900 text-purple-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                <Palette className="w-5 h-5" />
                <span>ArtVista</span>
              </div>
              <p className="text-sm text-purple-300">
                Discover extraordinary art from emerging and established artists
                worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-purple-300 hover:text-white no-underline transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/exhibit"
                  className="text-sm text-purple-300 hover:text-white no-underline transition-colors"
                >
                  Exhibit
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p className="text-sm text-purple-300">hello@artvista.gallery</p>
              <p className="text-sm text-purple-300 mt-1">
                +1 (555) 234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-6 text-center text-sm text-purple-400">
            &copy; {new Date().getFullYear()} ArtVista. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
