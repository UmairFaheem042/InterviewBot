import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Oval
        visible={true}
        strokeWidth="5"
        height="100"
        width="100"
        color="rgba(0,0,0,1)"
        secondaryColor="rgba(0,0,0,0.5)"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingScreen;
