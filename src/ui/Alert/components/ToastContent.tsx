import React from 'react';

interface ToastContentProps {
  content: React.ReactNode;
}

const ToastContent: React.FC<ToastContentProps> = ({ content }) => {
  return <div>{content}</div>;
};

export default ToastContent;
