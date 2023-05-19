import axios from 'axios';
import { showToast } from '../utils/showToast';

export const handleLoginSubmit = async (
  e,
  username,
  password,
  setIsLoggedIn,
  navigate
) => {
  e.preventDefault();
  if (!username || !password) {
showToast('Please Fill all the fields', 'info');
    return;
  }
  if (username.match(/^[a-zA-Z0-9]+$/)) {
    try {
      let response = axios.post('http://localhost:5000/auth/login', {
        username: username,
        password: password,
      });
      showToast('Please Wait!!', 'info');
      response = await response;
      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.userId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        showToast('User Logged in Successfully!!, Redirecting', 'success');
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      showToast('Cannot Login', 'fail');
      showToast(err.response.data.error, 'fail');
    }
  } else {
    showToast('Please Check the inputs', 'fail');
  }
};

export const handleRegisterSubmit = async (
  e,
  name,
  username,
  email,
  password,
  image,
  navigate
) => {
  e.preventDefault();
  if (!name || !username || !email || !password) {
    showToast('Please Fill all the fields', 'info');
    return;
  }
  if (
    name.match(/^[a-zA-Z ]+$/) &&
    username.match(/^[a-zA-Z0-9]+$/) &&
    email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  ) {
    try {
      let response = axios.put(
        'http://localhost:5000/auth/signup',
        {
          name: name,
          email: email,
          username: username,
          password: password,
          avatar: image,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      showToast('Please Wait!!', 'info');
      response = await response;
      if (response.status === 201) {
        showToast('User Registered Successfully!!', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (err) {
      showToast(err);
      showToast('Cannot Register User', 'fail');
      showToast(err.response.data.message, 'fail');
    }
  } else {
    showToast('Please Check the inputs', 'fail');
  }
};

export const blockUser = async (user, userId, token, setUpdateUI) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/auth/block-user/${userId}`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    if (response.status === 200) {
      showToast('User Blocked', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setUpdateUI(false);
      }, 2000);
    }
  } catch (err) {
    showToast('Cannot block User', 'fail');
  }
};

export const unblockUser = async (user, userId, token, setUpdateUI) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/auth/unblock-user/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      showToast('User Unblocked', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setUpdateUI(false);
      }, 2000);
    }
  } catch (err) {
    showToast('Cannot unblock User', 'fail');
  }
};

export const getUserRole = async (setIsAdmin, setIsModerator) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      'http://localhost:5000/auth/get-role',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      if (response.data.role === 'moderator') {
        setIsModerator(true);
        setIsAdmin(false);
      } else if (response.data.role === 'admin') {
        setIsAdmin(true);
        setIsModerator(false);
      } else {
        setIsModerator(false);
        setIsAdmin(false);
      }
    } else {
      showToast('Cannot get user role');
    }
  } catch (err) {
    showToast(err);
  }
};

export const isAdmin = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      'http://localhost:5000/auth/get-role',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data.role);
    if (response.status === 200) {
      return response.data.role;
    } else {
      showToast('Cannot get user role');
    }
  } catch (err) {
    showToast(err);
  }
};

export const getModerators = async (setMods) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
     'http://localhost:5000/auth/get-moderators',
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    if (response.status === 200) {
      const mod = [];
      for (let i = 0; i < response.data.data.length; i++) {
        mod.push(response.data.data[i]);
      }
      setMods(mod);
    }
  } catch (err) {
    showToast(err);
  }
};

export const getAllUsers = async (setUsers) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      'http://localhost:5000/auth/get-users' ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = [];
    for (let i = 0; i < response.data.data.length; i++) {
      user.push(response.data.data[i]);
    }
    setUsers(user);
  } catch (err) {
    showToast(err);
  }
};

export const getUploader = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/home/get-image/${id}`, { });
    showToast(response.data.data);
    if (response.status === 200) {
      return response.data.data.creator;
    }
  } catch (err) {
    showToast(err);
  }
};
export const handleDeleteUser = async (e, userId, setUpdateUI) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `http://localhost:5000/auth/delete-user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      showToast('User Deleted', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setUpdateUI(false);
      }, 1000);
    } else {
      showToast('Only Admin can delete user', 'fail');
    }
  } catch (err) {
    showToast(err);
    showToast('Only Admin can delete user', 'fail');
  }
};

export const handleForget = async (e,email)=>{
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:5000/auth/reset-password/`,
      {email}
    )
    console.log(response)
    if (response.status === 200) {
      showToast('Reset Email has been sent to your email', 'success');
      setTimeout(() => {
        // setUpdateUI(false);
      }, 1000);
    } else {
      showToast('We cant sent the email check your email', 'fail');
    }
  }catch(err){
    console.log(err)
  }
}
export const resetPassword = async (e,password,confirmPassword,passwordToken,navigate)=>{
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:5000/auth/new-password/`,
      {password,confirmPassword,passwordToken}
    )
    console.log(response)
    if (response.status === 200) {
      showToast(response.data.message, 'success');
      setTimeout(() => {
          navigate('/login')
        }, 1000);
    } else {
      showToast('Try again after some time!', 'fail');
    }
  }catch(err){
    console.log(err)
  }
}