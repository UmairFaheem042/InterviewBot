import React from "react";
import Header from "../../components/Header";

const layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
    </div>
  );
};

export default layout;
