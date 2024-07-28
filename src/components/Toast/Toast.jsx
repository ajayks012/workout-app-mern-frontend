import React, { useState } from "react";

const Toast = ({ type, message }) => {
  const [visible, setVisible] = useState < boolean > true;
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
