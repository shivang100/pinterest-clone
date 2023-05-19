import { toast } from 'react-toastify';

export const showToast = (text, type) => {
  if (type === 'success') {
    toast.success(text);
  } else if (type === 'fail') {
    toast.error(text);
  } else if (type === 'info') {
    toast.info(text);
  } else {
    toast(text);
  }
};
