import { Button } from "@/components/ui/button"; // Assuming the button is exported from a ui folder
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b shadow-md w-full">
      <div className="items-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="primary" className="px-4 py-2 text-black rounded-full">Login</Button>
        </Link>
        <span className="text-gray-500">/</span>
        <Link to="/register">
          <Button variant="secondary" className="px-4 py-2 text-gray-800 rounded-full">Register</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;