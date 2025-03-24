import { LogOut, MenuIcon, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // this below code is coming from the content.js file where we are using the zustand store to get the content type and that will change the content type

  const { setContentType } = useContentStore();


  return (
    // This below section is the Navbar of the Netflix Clone where we have the Netflix Logo and the Navbar items
    // We have used the Link component from react-router-dom to navigate to the home page when the user clicks on the Netflix Logo

    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
            <Link to="/" >
                <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40"/>
            </Link>

            {/* Desktop Navbar items */}

            <div className="hidden sm:flex gap-2 items-center">
             <Link to={"/"} className="hover:underline" onClick={() => setContentType("movie")}>      {/* // here we are using the setContentType function to change the content type */}
                    Movies
                </Link>
                <Link to={"/"} className="hover:underline" onClick={() => setContentType("tv")}>
                    TV Shows
                </Link>
                <Link to={"/history"} className="hover:underline">
                    Search History
                </Link>
            </div>
        </div>

        {/* this is for the search icon and the user icon image */}
        <div className="flex gap-2 items-center z-50">
            <Link to={"/search"}>
                <Search className="size-6 cursor-pointer"/>
            </Link>
            <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer"/>
            <LogOut className="size-5 cursor-pointer" onClick={logout}/>

            <div className="sm:hidden">
                <MenuIcon className="size-6 cursor-pointer" onClick={toggleMobileMenu}/>
            </div>
        </div>
        
        {/* Mobile Navbar items     // we need a state for this  */}

        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
                <Link to={"/"} 
                    className="block hover:underline p-2"
                    onClick={toggleMobileMenu}
                >
                    Movies
                </Link>
                <Link to={"/"} 
                    className="block hover:underline p-2"
                    onClick={toggleMobileMenu}
                >
                    Tv Shows
                </Link>
                <Link to={"/history"} 
                    className="block hover:underline p-2"
                    onClick={toggleMobileMenu}
                >
                    Searh History
                </Link>
            </div>
        )}
    </header>
  )
}

export default Navbar