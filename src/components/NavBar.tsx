import { useState, useEffect, useRef } from "react";
import { useAuth } from "react-oidc-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoles } from "@/hooks/UseRoles";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import { LogOut } from "lucide-react";
import { FaUser, FaUserAlt } from "react-icons/fa";

const NavBar: React.FC = () => {
  const { user, isAuthenticated, signinRedirect, signoutRedirect } = useAuth();
  const { isOrganizer, isStaff } = useRoles();
  const isAttendee = isAuthenticated && !isOrganizer && !isStaff;

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setAvatarOpen(false);
  };

  const toggleAvatar = () => {
    setAvatarOpen((prev) => !prev);
    setMenuOpen(false);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setAvatarOpen(false);
  };

  // ⬇️ Add this ref and effect to close hamburger on outside click
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  // ⬆️ End of added section

  return (
    <div className="bg-gray-950 border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="container mx-auto p-3 sm:p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="flex items-center space-x-2 transform hover:scale-105 transition duration-200"
            >
              <img
                src={LogoImg}
                className="w-7 h-7 sm:w-8 sm:h-8"
                alt="ABC Evantra Logo"
              />
              <h1 className="text-lg sm:text-xl font-bold text-purple-600">
                ABC Evantra
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-4 items-center">
            {isAttendee && (
              <>
                <Link to="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
                <Link to="/events" className="hover:text-purple-600 transition">
                  Events
                </Link>
                <Link
                  to="/dashboard/tickets"
                  className="hover:text-purple-600 transition"
                >
                  Tickets
                </Link>
                <Link to="/about" className="hover:text-purple-600 transition">
                  About
                </Link>
                <Link to="/contact" className="hover:text-purple-600 transition">
                  Contact
                </Link>
                <Link to="/community" className="hover:text-purple-600 transition">
                  Community
                </Link>
              </>
            )}
            {isOrganizer && (
              <>
                <Link to="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
                <Link
                  to="/dashboard/events"
                  className="hover:text-purple-600 transition"
                >
                  Event-List
                </Link>
                <Link
                  to="/dashboard/events/create"
                  className="hover:text-purple-600 transition"
                >
                  Create-Update-Events
                </Link>
                <Link
                  to="/organizers/:organizerId/analytics"
                  className="hover:text-purple-600 transition"
                >
                  Analytics
                </Link>
                <Link to="/about" className="hover:text-purple-600 transition">
                  About
                </Link>
                <Link to="/contact" className="hover:text-purple-600 transition">
                  Contact
                </Link>
                <Link to="/community" className="hover:text-purple-600 transition">
                  Community
                </Link>
              </>
            )}
            {isStaff && (
              <>
                <Link to="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
                <Link
                  to="/dashboard/validate-qr"
                  className="hover:text-purple-600 transition"
                >
                  Validate QR
                </Link>
                <Link to="/about" className="hover:text-purple-600 transition">
                  About
                </Link>
                <Link to="/contact" className="hover:text-purple-600 transition">
                  Contact
                </Link>
                <Link to="/community" className="hover:text-purple-600 transition">
                  Community
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/" className="hover:text-purple-600 transition">
                  Home
                </Link>
                <Link to="/events" className="hover:text-purple-600 transition">
                  Events
                </Link>
                <Link to="/about" className="hover:text-purple-600 transition">
                  About
                </Link>
                <Link to="/contact" className="hover:text-purple-600 transition">
                  Contact
                </Link>
                <Link to="/community" className="hover:text-purple-600 transition">
                  Community
                </Link>
              </>
            )}
          </div>

          {/* Right: Avatar + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            {isAuthenticated ? (
              <DropdownMenu open={avatarOpen} onOpenChange={toggleAvatar}>
                <DropdownMenuTrigger asChild>
                  <FaUser className="h-8 w-8 sm:h-9 sm:w-9 hover:rounded-xl rounded-xl transition cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 sm:w-56 bg-gray-900 border-gray-700 text-white"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium text-white">
                      {user?.profile?.preferred_username || "User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.email || "No email"}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />


                  <DropdownMenuItem
                    className=""
                    onClick={() => {closeAll();
                      window.location.href = "/dashboard/profile";
                    }}
                  >
                    <FaUserAlt className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>


                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="hover:bg-red-600 hover:text-red-400 cursor-pointer"
                    onClick={() => {
                      closeAll();
                      signoutRedirect();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => signinRedirect()}
                className="hidden sm:block text-purple-600 hover:text-purple-800 text-lg font-bold"
              >
                Log In
              </button>
            )}

            {/* Hamburger Toggle for Mobile */}
            <div className="sm:hidden relative" ref={hamburgerRef}>
              <button
                onClick={toggleMenu}
                className="flex flex-col gap-1.5 p-2 z-50 relative"
              >
                <span className="w-6 h-0.5 bg-gray-300"></span>
                <span className="w-6 h-0.5 bg-gray-300"></span>
                <span className="w-6 h-0.5 bg-gray-300"></span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-gray-900 border border-gray-700 p-4 z-40 flex flex-col gap-3">
                  {isAttendee && (
                    <>
                      <Link to="/" onClick={closeAll}>Home</Link>
                      <Link to="/events" onClick={closeAll}>Events</Link>
                      <Link to="/dashboard/tickets" onClick={closeAll}>Tickets</Link>
                      <Link to="/about" onClick={closeAll}>About</Link>
                      <Link to="/contact" onClick={closeAll}>Contact</Link>
                      <Link to="/community" onClick={closeAll}>Community</Link>
                    </>
                  )}
                  {isOrganizer && (
                    <>
                      <Link to="/" onClick={closeAll}>Home</Link>
                      <Link to="/dashboard/events" onClick={closeAll}>Event-List</Link>
                      <Link to="/dashboard/events/create" onClick={closeAll}>Create-Update-Events</Link>
                      <Link to="/organizers/:organizerId/analytics" onClick={closeAll}>Analytics</Link>
                      <Link to="/about" onClick={closeAll}>About</Link>
                      <Link to="/contact" onClick={closeAll}>Contact</Link>
                      <Link to="/community" onClick={closeAll}>Community</Link>
                    </>
                  )}
                  {isStaff && (
                    <>
                      <Link to="/" onClick={closeAll}>Home</Link>
                      <Link to="/dashboard/validate-qr" onClick={closeAll}>Validate QR</Link>
                      <Link to="/about" onClick={closeAll}>About</Link>
                      <Link to="/contact" onClick={closeAll}>Contact</Link>
                      <Link to="/community" onClick={closeAll}>Community</Link>
                    </>
                  )}
                  {!isAuthenticated && (
                    <>
                      <Link to="/" onClick={closeAll}>Home</Link>
                      <Link to="/events" onClick={closeAll}>Events</Link>
                      <Link to="/about" onClick={closeAll}>About</Link>
                      <Link to="/contact" onClick={closeAll}>Contact</Link>
                      <Link to="/community" onClick={closeAll}>Community</Link>
                      <button
                        onClick={() => {
                          closeAll();
                          signinRedirect();
                        }}
                        className="text-purple-600 hover:text-purple-800 text-lg font-bold"
                      >
                        Log In
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
