import { toast, ToastOptions } from 'react-toastify';
import React from 'react';
import ToastContent from 'src/ui/Alert/components/ToastContent';
import clsx from 'clsx';
import styles from './style.module.scss';

interface ToastAlertProps {
  content: React.ReactNode;
  isError?: boolean;
  options?: ToastOptions<{}>;
}
export const toastAlert = ({ content, isError, options }: ToastAlertProps) => {
  const autoClose = options?.autoClose ?? 3000;

  return toast(<ToastContent content={content} />, {
    position: toast.POSITION.TOP_RIGHT,
    className: clsx(styles.toast, { [styles.toastError]: isError }),
    closeOnClick: true,
    autoClose: autoClose,
    ...options
  });
};
