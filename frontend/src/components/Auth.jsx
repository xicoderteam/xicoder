import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api';

const Auth = ({ setUser }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);

    useEffect(() => {
        if (location.state?.isLogin !== undefined) {
            setIsLogin(location.state.isLogin);
        }
    }, [location.state]);

    const [formData, setFormData] = useState({ username: '', email: '', password: '', cf_handle: '' });
    const [message, setMessage] = useState('');

    // Google button now does NOTHING, waiting for 3rd party integration
    const handleGoogleClick = (e) => {
        e.preventDefault();
        // Integration pending...
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login' : '/register';
        try {
            const response = await API.post(endpoint, formData);

            const userData = isLogin
                ? { username: response.data.user.username }
                : { username: formData.username };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            navigate('/');
        } catch (err) {
            setMessage(err.response?.data?.error || "Action failed");
        }
    };

    const inputClasses = "w-full p-3 border-2 border-black bg-white focus:bg-black/5 outline-none transition-all placeholder:text-gray-400 font-mono text-sm font-bold text-black";

    return (
        <div className="relative">
            <div className="bg-white p-8 rounded-none border-2 border-black w-[380px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-6">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
                        {isLogin ? "Login" : "Register"}
                    </h2>
                    <div className="h-1.5 w-12 bg-black mt-2"></div>
                </div>

                <button
                    onClick={handleGoogleClick}
                    className="w-full flex items-center justify-center gap-3 border-2 border-black py-3 font-bold text-black hover:bg-black hover:text-white transition-all uppercase text-xs tracking-widest cursor-not-allowed opacity-80"
                >
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 grayscale invert" alt="" />
                    Continue with Google
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t-2 border-black"></div>
                    <span className="px-4 text-black font-black uppercase text-xs tracking-widest">OR</span>
                    <div className="flex-grow border-t-2 border-black"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text" placeholder="USERNAME" required
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    )}
                    <input
                        type="email" placeholder="EMAIL ADDRESS" required
                        className={inputClasses}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" placeholder="PASSWORD" required
                        className={inputClasses}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {!isLogin && (
                        <input
                            type="text" placeholder="CODEFORCES HANDLE" required
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, cf_handle: e.target.value })}
                        />
                    )}

                    <button className="w-full bg-black text-white p-4 font-black text-lg hover:bg-white hover:text-black border-2 border-black transition-all uppercase tracking-widest mt-2">
                        {isLogin ? "Enter" : "Create Account"}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-6 text-black font-bold uppercase text-[10px] tracking-widest hover:underline block w-full text-center"
                >
                    {isLogin ? "Need an account? Register" : "Have an account? Login"}
                </button>
                {message && <p className="mt-4 text-center text-red-500 font-bold text-sm">{message}</p>}
            </div>
        </div>
    );
};

export default Auth;