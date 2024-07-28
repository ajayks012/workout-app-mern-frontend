import React from "react";

const LoadingComponent = ({ loading }) => {
  return loading ? (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-primary border-t-transparent border-solid w-12 h-12"></div>
    </div>
  ) : (
    <></>
  );
};

export default LoadingComponent;
