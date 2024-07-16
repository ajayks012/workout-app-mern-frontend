import React, { useState } from "react";

interface toastProps {
  type: string;
  message: string;
}

const Toast: React.FC<toastProps> = ({ type, message }) => {
  const [visible, setVisible] = useState<boolean>(true);
  setTimeout(() => {
    setVisible(false);
  }, 3000);

  return visible ? (
    <div className="toast toast-end">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Toast;
