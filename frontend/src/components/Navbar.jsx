import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null); // This acts as a sensor for outside clicks

    // 1. Close dropdown when the page changes
    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location]);

    // 2. Close dropdown when clicking ANYWHERE outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="flex justify-between items-center px-10 h-20 bg-white border-b-4 border-black sticky top-0 z-50">

            {/* STRICTLY LEFT */}
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center">
                    <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain object-left" />
                </Link>

                <Link to="/about" className="text-black font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4">
                    About Us
                </Link>
            </div>

            {/* STRICTLY RIGHT */}
            <div className="flex items-center gap-6">
                {!user ? (
                    <>
                        <Link to="/auth" state={{ isLogin: true }} className="text-black font-black uppercase text-sm tracking-widest hover:opacity-70">
                            Login
                        </Link>
                        <Link to="/auth" state={{ isLogin: false }} className="bg-black text-white px-6 py-2 font-black uppercase text-sm tracking-widest border-4 border-black hover:bg-white hover:text-black transition-all">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <div className="relative" ref={dropdownRef}>
                        {/* Clickable Username Button */}
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 border-4 border-black px-4 py-1 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                        >
                            <span className="font-mono font-black text-lg text-black uppercase">{user.username}</span>
                            <span className="text-xs">▼</span>
                        </button>

                        {/* The Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col">
                                <a href="#" className="px-4 py-3 font-bold text-sm uppercase hover:bg-black hover:text-white border-b-2 border-black transition-colors">
                                    Edit Profile
                                </a>
                                <a href="#" className="px-4 py-3 font-bold text-sm uppercase hover:bg-black hover:text-white border-b-2 border-black transition-colors">
                                    Settings
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-3 font-black text-sm uppercase bg-gray-100 hover:bg-red-500 hover:text-white text-left transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;