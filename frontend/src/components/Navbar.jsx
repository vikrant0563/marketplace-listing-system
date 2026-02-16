import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();   
    navigate("/");
  };

  if (loading) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

     
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MarketPlace
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>

          {user && (
    <>
      <Link to="/create" className="hover:text-blue-600">
        Create Listing
      </Link>

      <Link to="/my-listings" className="hover:text-blue-600">
        My Listings
      </Link>

      {/* 👤 USER NAME */}
      <span className="text-gray-700 font-medium">
        Hi, {user.fullname} 
      </span>
    </>
  )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

       
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-4 pb-4 space-y-2">
          <Link to="/" className="block">Home</Link>

          {user && (
            <>
              <Link to="/create" className="block">Create Listing</Link>
              <Link to="/my-listings" className="block">My Listings</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="block text-blue-600">Login</Link>
              <Link to="/register" className="block text-green-600">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;