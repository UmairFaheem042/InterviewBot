import React from "react";
import AddNewInterview from "../../../components/AddNewInterview";
import { db } from "../../../utils/db";
import { MockInterview, UserResponse } from "../../../utils/schema";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

const page = async () => {
  const data = await db.select().from(MockInterview);

  // ! Continue from here - 10-11-2024 @1:21 PM
  async function handleDelete(mockId) {
    try {
      await db.delete(UserResponse).where(UserResponse.mockIdRef.eq(mockId));
      await db.delete(MockInterview).where(MockInterview.mockId.eq(mockId));
      console.log(
        `Interview with mockId: ${mockId} and its responses have been deleted.`
      );
    } catch (error) {
      console.error("Error deleting interview and responses:", error);
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-5">
        <div>
          <h2 className="font-bold text-4xl">Dashboard</h2>
          <h2 className="text-gray-500">
            Create and Start your AI Mock Interview
          </h2>
        </div>
        <AddNewInterview />
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
        {data
          .slice()
          .reverse()
          .map((item, index) => (
            <Link
              href={`/dashboard/interview/${item.mockId}/feedback`}
              className="border sm:gap-8 rounded-lg overflow-hidden"
              key={item.id}
            >
              <div className="h-[150px] flex flex-col items-start justify-start w-full p-4 gap-1">
                <h3 className="text-lg font-semibold sm:text-xl line-clamp-1">
                  {item.jobPosition}
                </h3>

                <p className="flex-1 mt-2 text-sm text-gray-500 line-clamp-3">
                  {item.jobDescription}
                </p>

                <div className="flex w-full items-center justify-between gap-1 text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>
                      <Briefcase className="w-4" />
                    </span>
                    <p className="text-xs font-medium">
                      {item.jobExperience} years
                    </p>
                  </div>
                  <Button
                    className="h-auto text-sm bg-red-600"
                    // onClick={() => {
                    //   "use client";
                    //   handleDelete();
                    // }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default page;
