// import React from "react";
// import AddNewInterview from "../../../components/AddNewInterview";
// import DashboardInterview from "../../../components/DashboardInterview";
// import { db } from "../../../utils/db";
// import { MockInterview } from "../../../utils/schema";
// import { eq } from "drizzle-orm";
// import { Briefcase } from "lucide-react";
// import Link from "next/link";

// const page = async () => {
//   const data = await db.select().from(MockInterview);
//   return (
//     <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//       {data?.length !== 0 && (
//         <>
//           <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-5">
//             <div>
//               <h2 className="font-bold text-4xl">Dashboard</h2>
//               <h2 className="text-gray-500">
//                 Create and Start your AI Mock Interview
//               </h2>
//             </div>
//             <AddNewInterview />
//           </div>
//           <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
//             {data
//               .slice()
//               .reverse()
//               .map((item, index) => (
//                 <div
//                   className="border sm:gap-8 rounded-lg overflow-hidden"
//                   key={item.id}
//                 >
//                   <div className="h-[150px] flex flex-col items-start justify-start w-full p-4 gap-1">
//                     <Link
//                       href={`/dashboard/interview/${item.mockId}/feedback`}
//                       className="hover:underline text-lg font-semibold sm:text-xl line-clamp-1"
//                     >
//                       {item.jobPosition}
//                     </Link>

//                     <p className="flex-1 mt-2 text-sm text-gray-500 line-clamp-3">
//                       {item.jobDescription}
//                     </p>

//                     <div className="flex w-full items-center justify-between gap-1 text-gray-500">
//                       <div className="flex items-center gap-2">
//                         <span>
//                           <Briefcase className="w-4" />
//                         </span>
//                         <p className="text-xs font-medium">
//                           {item.jobExperience} years
//                         </p>
//                       </div>
//                       <DashboardInterview mockId={item.mockId} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </>
//       )}
//       {data?.length === 0 && (
//         <div className="flex flex-col gap-5  min-h-[80vh]">
//           <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-5">
//             <div>
//               <h2 className="font-bold text-4xl">Dashboard</h2>
//               <h2 className="text-gray-500">
//                 Create and Start your AI Mock Interview
//               </h2>
//             </div>
//             <AddNewInterview />
//           </div>
//           <div className="flex flex-1 flex-col items-center justify-center gap-5">
//             <h1 className="text-center text-4xl sm:text-6xl font-semibold text-gray-200">
//               No Interviews Found
//             </h1>
//             <AddNewInterview label={"Create New Interview"} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;

"use client";

import React, { useEffect, useState } from "react";
import AddNewInterview from "../../../components/AddNewInterview";
import DashboardInterview from "../../../components/DashboardInterview";
import LoadingScreen from "../../../components/LoadingScreen";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = user?.id;

  const fetchData = async () => {
    if (userId) {
      setIsLoading(true);
      const data = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        );
      setData(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* {!isLoading && ( */}
      <>
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
                .map((item) => (
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
                        <DashboardInterview
                          mockId={item.mockId}
                          setIsLoading={setIsLoading}
                          fetchData={fetchData}
                        />
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
      </>
      {/* )} */}
      {/* {isLoading && (
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
      )} */}
    </div>
  );
};

export default Page;
