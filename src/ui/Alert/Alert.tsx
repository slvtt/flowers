import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Alert: React.FC = () => {
  return <ToastContainer position={toast.POSITION.TOP_RIGHT} hideProgressBar />;
};

export default Alert;
