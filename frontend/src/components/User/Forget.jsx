import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleForget} from '../../api/UserAPI';
const Forget = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <React.Fragment>
      <div className="bg-white relative">
        <div
          className="flex flex-row items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 lg:flex-row"
        >
          <div className="flex flex-row items-center w-full items-center justify-center pt-5 pr-10 pb-20 pl-10 lg:flex-row">
            
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative round-s-full  z-10 max-w-2xl lg:mt-0 lg:w-5/12 ">
            <div className="w-full bg-cover  relative items-center justify-center max-w-md lg:max-w-2xl lg:w-7/12">
              <div >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
                  className="round-s-sm  pl-1000 pt-0 pr-0 pb-0"
                  style={{margin:"10px 70%",height:"60px",width:"60px"}}
                  alt=""
                />
              </div>
            </div>
              <div
                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
              relative z-10"
              >
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                </p>
                <form
                  onSubmit={(e) => handleForget(e, email)}
                  className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"
                >
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                      Email
                    </p>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      autoComplete="email"
                      className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    />
                  </div>

                 
                  <div className="relative">
                    <button
                      type="submit"
                      className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-red-500
                    rounded-lg transition duration-200 hover:bg-red-400 ease"
                    >
                      Submit
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forget;
