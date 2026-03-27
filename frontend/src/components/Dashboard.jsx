import React from 'react';

const Dashboard = ({ user }) => {
    const boxClasses = "w-72 h-48 flex flex-col items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black uppercase text-xl tracking-widest text-center px-4 relative";
    const hoverClasses = "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white cursor-pointer";
    const disabledClasses = "opacity-50 bg-gray-100 cursor-not-allowed";

    return (
        <div className="flex flex-col items-center pt-16 px-4 pb-20">
            <div className="w-full max-w-5xl">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">
                    Welcome, {user?.username || 'Coder'}
                </h1>
                <div className="h-1.5 w-16 bg-black mb-12"></div>
            </div>

            {/* Grid Container for the Buttons */}
            <div className="flex flex-col gap-10 items-center">

                {/* Top Row (3 Buttons) */}
                <div className="flex flex-wrap justify-center gap-10">
                    <div className={`${boxClasses} ${hoverClasses}`}>
                        Create<br />Room
                    </div>

                    <div className={`${boxClasses} ${hoverClasses}`}>
                        Join<br />Room
                    </div>

                    {/* Tournament (Upcoming) */}
                    <div className={`${boxClasses} ${disabledClasses}`}>
                        <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                            Upcoming
                        </span>
                        Tournaments
                    </div>
                </div>

                {/* Bottom Row (2 Buttons) */}
                <div className="flex flex-wrap justify-center gap-10">
                    <div className={`${boxClasses} ${hoverClasses}`}>
                        Past Room<br />Details
                    </div>

                    {/* Past Tournament (Upcoming) */}
                    <div className={`${boxClasses} ${disabledClasses}`}>
                        <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                            Upcoming
                        </span>
                        Past<br />Tournaments
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;