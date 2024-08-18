import LOGO_URL from "../utils/logo.webp";
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { Book, BrainCog, Download, PenTool, LogOut, User } from 'lucide-react';

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser, setUserName } = useContext(UserContext);

  const Button = ({ children, className, ...props }) => (
    <button
      className={`px-4 py-2 rounded font-semibold transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    // Implement your sign out logic here
    setUserName(null);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
            <img src={LOGO_URL} alt="AI Flashcards Logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white">AI Flashcards</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            {!isLoginPage && !loggedInUser && (
              <>
                <li><a href="#features" className="text-gray-300 hover:text-white transition duration-300">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition duration-300">How It Works</a></li>
              </>
            )}
            {loggedInUser ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white" onClick={() => navigate('/profile')}>
                    <User className="w-5 h-5 mr-2 inline-block" />
                    Profile
                  </Button>
                </li>
                <li>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSignOut}>
                    <LogOut className="w-5 h-5 mr-2 inline-block" />
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleGetStarted}>
                  {isLoginPage ? 'Sign Up' : 'Get Started'}
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;