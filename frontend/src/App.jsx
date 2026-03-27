import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'; // IMPORT THE FOOTER

function App() {
  // 1. Check browser memory to see if user is already logged in!
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      {/* The bg-gray-50 here is the "CodeChef White" background */}
      <div className="min-h-screen flex flex-col bg-gray-200 font-sans">

        {/* Pass setUser to Navbar so it can handle logging out */}
        <Navbar user={user} setUser={setUser} />

        {/* 3. Added flex-grow so this main content area takes up all empty space */}
        <div className="grow">
          <Routes>
            {/* HOME PAGE ROUTE */}
            <Route path="/" element={
              user ? (
                <Dashboard user={user} />
              ) : (
                <main className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4">
                  <div className="text-center max-w-4xl">
                    <p className="text-gray-500 font-bold mb-4 tracking-widest uppercase text-sm">
                      {'{ Trusted by future pro-coders }'}
                    </p>
                    <h1 className="text-5xl font-extrabold text-black mb-4 leading-tight">
                      Master Competitive Programming with <span className="underline decoration-black decoration-4 underline-offset-4">XIcoder</span>
                    </h1>
                    <p className="text-6xl font-black text-black mb-8 tracking-tighter">
                      Bored of Theory? Let's Code for Real
                    </p>
                    <p className="text-gray-600 text-lg mb-10 font-medium">
                      Join 1v1 battles, crack problems from Codeforces, and climb the leaderboard.
                    </p>
                    <Link to="/auth" state={{ isLogin: false }} className="bg-black text-white text-lg px-12 py-4 font-bold border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all inline-block">
                      Get Started
                    </Link>
                  </div>
                </main>
              )
            } />

            <Route path="/auth" element={
              <div className="flex justify-center pt-20 pb-20">
                <Auth setUser={setUser} />
              </div>
            } />

            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>

        {/* 4. FOOTER AT THE VERY BOTTOM */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;