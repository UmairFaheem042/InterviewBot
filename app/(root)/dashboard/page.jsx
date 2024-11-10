import React from "react";
import AddNewInterview from "../../../components/AddNewInterview";
import DashboardInterview from "../../../components/DashboardInterview";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const data = await db.select().from(MockInterview);

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {data?.length !== 0 && (
        <>
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
                <div
                  className="border sm:gap-8 rounded-lg overflow-hidden"
                  key={item.id}
                >
                  <div className="h-[150px] flex flex-col items-start justify-start w-full p-4 gap-1">
                    <Link
                      href={`/dashboard/interview/${item.mockId}/feedback`}
                      className="hover:underline text-lg font-semibold sm:text-xl line-clamp-1"
                    >
                      {item.jobPosition}
                    </Link>

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
                      <DashboardInterview mockId={item.mockId} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {data?.length === 0 && (
        <div className="flex flex-col gap-5  min-h-[80vh]">
          <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-5">
            <div>
              <h2 className="font-bold text-4xl">Dashboard</h2>
              <h2 className="text-gray-500">
                Create and Start your AI Mock Interview
              </h2>
            </div>
            <AddNewInterview />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-5">
            <h1 className="text-center text-4xl sm:text-6xl font-semibold text-gray-200">
              No Interviews Found
            </h1>
            <AddNewInterview label={"Create New Interview"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

// "use client";

// import React, { useState } from "react";
// import AddNewInterview from "../../../components/AddNewInterview";
// import DashboardInterview from "../../../components/DashboardInterview";
// import { db } from "../../../utils/db";
// import { MockInterview, UserResponse } from "../../../utils/schema";
// import { eq } from "drizzle-orm";

// const Page = () => {
//   const [data, setData] = useState([]);

//   // Fetch data on client-side load
//   React.useEffect(() => {
//     async function fetchData() {
//       const interviews = await db.select().from(MockInterview);
//       setData(interviews);
//     }
//     fetchData();
//   }, []);

//   async function handleDelete(mockId) {
//     try {
//       // await db.delete(UserResponse).where(UserResponse.mockIdRef.eq(mockId));
//       // await db.delete(MockInterview).where(MockInterview.mockId.eq(mockId));
//       await db.delete(UserResponse).where(eq(UserResponse.mockIdRef, mockId));
//       await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));
//       console.log(
//         `Interview with mockId: ${mockId} and its responses have been deleted.`
//       );

//       setData((prevData) => prevData.filter((item) => item.mockId !== mockId));
//     } catch (error) {
//       console.error("Error deleting interview and responses:", error);
//     }
//   }

//   return (
//     <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-5">
//         <div>
//           <h2 className="font-bold text-4xl">Dashboard</h2>
//           <h2 className="text-gray-500">
//             Create and Start your AI Mock Interview
//           </h2>
//         </div>
//         <AddNewInterview />
//       </div>
//       <DashboardInterview data={data} handleDelete={handleDelete} />
//     </div>
//   );
// };

// export default Page;
