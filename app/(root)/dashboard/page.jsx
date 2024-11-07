import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "../../../components/AddNewInterview";

const page = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-4xl">Dashboard</h2>
          <h2 className="text-gray-500">
            Create and Start your AI Mock Interview
          </h2>
        </div>
        <AddNewInterview />
      </div>
    </div>
  );
};

export default page;
