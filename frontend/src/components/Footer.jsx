import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t-4 border-black bg-white py-8 px-10 mt-auto">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <span className="font-black uppercase tracking-[0.2em] text-sm text-black">
                        © {new Date().getFullYear()} XIcoder
                    </span>
                </div>

                <div className="flex gap-8">
                    <a href="#" className="font-bold uppercase text-xs tracking-widest text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                        Privacy Policy
                    </a>
                    <a href="#" className="font-bold uppercase text-xs tracking-widest text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                        Terms
                    </a>
                    <a href="#" className="font-bold uppercase text-xs tracking-widest text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all">
                        Feedback
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;