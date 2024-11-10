"use client";

import React from "react";
import { Button } from "./ui/button";

const DeleteInterview = ({ mockId, onClick }) => {
  return (
    <Button
      className="h-auto text-sm bg-red-600 hover:bg-red-700"
      onClick={() => console.log("Hello")}
    >
      Delete
    </Button>
  );
};

export default DeleteInterview;
