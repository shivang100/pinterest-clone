import axios from 'axios';
import { showToast } from '../utils/showToast';

export const submitComment = async (e, setUpdateUI, img, comment) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    if (comment.trim().length === 0) {
      showToast('Please write something in comment', 'fail');
      return;
    }
    const response = await axios.post(
      `http://localhost:5000/home/post-comment/${img._id}`,
      {
        comment: comment,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      showToast('Comment added Successfully', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setUpdateUI(false);
      }, 1000);
    } else {
      showToast('Cannot add comment', 'fail');
    }
  } catch (err) {
    showToast('You Needed to be logged in to comment on this image', 'fail');
  }
};

export const handleDeleteImage = async (
  e,
  img,
  setModel,
  setOpen,
  setUpdateUI
) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(
      `http://localhost:5000/home/delete-image/${img._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      showToast('Image Deleted Successfully', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setModel(false);
        setOpen(false);
        setUpdateUI(false);
      }, 1000);
    } else {
      showToast('Cannot Delete Image', 'fail');
    }
  } catch (err) {
    showToast(err);
    if (
      err.response.data.message ===
      'You do not have enough privileges to perform this action'
    ) {
      showToast('You cannot delete images uploaded by others', 'fail');
    } else {
      showToast('Cannot Delete Image', 'fail');
    }
  }
};

export const handleLikeImage = async (e, img, setLikes, likes) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `http://localhost:5000/home/like-image/${img._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      setLikes(likes + 1);
    } else if (response.status===201) {
      showToast('Cannot Like Photo as already liked ', 'fail');
    }
    else{
      showToast('Cannot Like Photo', 'fail');
    }
  } catch (err) {
    showToast('You Needed to be logged in to like this image', 'fail');
  }
};

export const handleImageSubmit = async (e, title, selectedImage, navigate) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    let response = axios.post(
      'http://localhost:5000/home/upload-image',
      {
        title: title,
        imageUrl: selectedImage,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast('Please Wait', 'info');
    response = await response;
    if (response.status === 201) {
      showToast('Image Uploaded, Redirecting', 'success');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      showToast('You Needed to be logged in to upload image', 'fail');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  } catch (err) {
    showToast('You Needed to be logged in to upload image', 'fail');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }
};

export const getAllImages = async (setImages) => {
  try {
    const response = await axios.get('http://localhost:5000/home/get-images');
    if (response.status === 200) {
      const img = [];
      for (let i = 0; i < response.data.data.length; i++) {
        const data = response.data.data[i];
        img.push({
          _id: data._id,
          imageUrl: data.imageUrl,
          title: data.title,
          likes: data.likes,
          imgId: data._id,
          comments: data.comments,
          creator:data.creator,
        });
      }
      setImages(img);
    } else {
      showToast('Something Went wrong, please refresh the page', 'fail');
    }
  } catch (err) {
    showToast(err);
  }
};

export const handleDeleteComment = async (e, commentId, setUpdateUI) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `http://localhost:5000/home/delete-comment/${commentId}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    if (response.status === 200) {
      showToast('Comment Deleted', 'success');
      setUpdateUI(true);
      setTimeout(() => {
        setUpdateUI(false);
      }, 1000);
    } else {
      showToast('Only Moderator can delete comments', 'fail');
    }
  } catch (err) {
    showToast(err);
    showToast('Only Moderator can delete comments', 'fail');
  }
};
