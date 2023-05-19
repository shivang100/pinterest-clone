import React,{useEffect,useState} from 'react';
import {MDBIcon} from 'mdb-react-ui-kit';
import {NavLink , useNavigate} from 'react-router-dom';
import  {getUserRole} from '../api/UserAPI';

const Navbar=({isLoggedIn,setIsLoggedIn}) =>{
    const navigate = useNavigate();
    const [isModerator,setIsModerator]=useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
   
    useEffect(() => {
        if (localStorage.getItem('token')) {
          setIsLoggedIn(true);
        }
      }, [setIsLoggedIn]);

      useEffect(() => {
        if (isLoggedIn)
          getUserRole(setIsAdmin, setIsModerator);
      }, [isLoggedIn]);

      const Logout =()=>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTimeout(() =>{
            navigate('/login');
        },1000);
      }

      return (
        <>
        <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col w-screen">
          <nav
            className="flex pb-4 bg-white/80 backdrop-blur-md shadow-md"
          >
            <div className="flex items-center">
              <NavLink to="/" className="cursor-pointer">
                <h3 className="text-2xl font-medium text-blue-500">
                  <img className="h-10 object-cover" src='https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png' alt="Logo" />
                </h3>
              </NavLink>
            </div>

            <div className="items-center space-x-8 flex sm:flex-column">
              <NavLink
                style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                to="/"
                className='flex
                cursor-pointer transition-colors duration-300
                font-semibold'
              >
                Home
              </NavLink>

              <NavLink
                style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                to="/upload"
                className='flex text-gray-600 
                cursor-pointer transition-colors duration-300
                font-semibold text-blue-600'
              >
                Upload Images
              </NavLink>

              {
                isLoggedIn && isModerator &&
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to='/moderator'
                  className="flex text-gray-600 
                            cursor-pointer transition-colors duration-300
                            font-semibold text-blue-600"
                >
                  Dashboard
                </NavLink>
              }
              {
                isLoggedIn && isAdmin &&
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to='/admin'
                  className="flex text-gray-600 
                            cursor-pointer transition-colors duration-300
                            font-semibold text-blue-600"
                >
                  Dashboard
                </NavLink>
              }

            </div>


            {isLoggedIn === false ? (
              <div className="flex items-center space-x-5 ml-auto mr-5">
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to="/register"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300`}
                ><MDBIcon className='fill-current h-5 w-5 mr-2 mt-0.5 h-24 w-24' far icon="registered" />
                  Register
                </NavLink>

                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to="/login"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300 font-semibold`}
                >
                  <MDBIcon className='fill-current h-5 w-5 mr-2 mt-0.5 h-24 w-24' fas icon="sign-in-alt" />
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-5 ml-auto mr-5">
                <button
                  onClick={() => Logout()}
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300`}
                >
                  <MDBIcon className='fill-current h-5 w-5 mr-2 mt-0.5 h-24 w-24' viewBox="0 0 24 24" fas icon="sign-out-alt" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div >
      </div >
        </>
      )
    
};
export default Navbar;
