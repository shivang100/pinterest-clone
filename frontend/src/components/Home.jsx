import React from 'react';
import Images from './Image/Images.jsx';
import './Home.css'
const Home = ({ isLoggedIn }) => {
    return (
        <React.Fragment>
            {
                // isLoggedIn &&
                <div className="flex items-center justify-center font-bold pt-4">
                    <div className="text-center space-y-12">
                        <div className="text-center text-2xl font-bold">
                            <div className="relative inline-grid grid-cols-1 grid-rows-1 gap-12 overflow-hidden">
                                <span className="inline-block animate-spin rounded-full p-2 bg-teal-400 text-white text-sm">Welcome</span>
                            </div>
                        </div>
                    </div>
                </div>

            }
            <Images />
        </React.Fragment>
    );
}

export default Home;