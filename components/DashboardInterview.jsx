"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";
import { MockInterview, UserResponse } from "../utils/schema";
import { toast } from "sonner";

const DashboardInterview = ({ mockId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleDelete(mockId) {
    try {
      await db.delete(UserResponse).where(eq(UserResponse.mockIdRef, mockId));
      await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));
      console.log(
        `Interview with mockId: ${mockId} and its responses have been deleted.`
      );
      router.refresh();
      setTimeout(() => {
        setOpen(false);
      }, 1000);

      toast("Interview deleted successfully");
    } catch (error) {
      console.error("Error deleting interview and responses:", error);
      toast("An error occurred!!!");
    }
  }
  return (
    <>
      {/* <AlertDialog> */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          onClick={() => setOpen(true)}
          className=" font-medium text-sm text-white px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently interview
              record from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel> */}
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete(mockId);
                //     // return;
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardInterview;

// import { Briefcase } from "lucide-react";
// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "./ui/alert-dialog";

// const DashboardInterview = ({ data, handleDelete }) => {
//   const [showDialog, setShowDialog] = useState(false);
//   return (
//     <>
//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//         {data
//           .slice()
//           .reverse()
//           .map((item) => (
//             <div
//               className="border sm:gap-8 rounded-lg overflow-hidden"
//               key={item.mockId}
//             >
//               <div className="h-[150px] flex flex-col items-start justify-start w-full p-4 gap-1">
//                 <Link
//                   href={`/dashboard/interview/${item.mockId}/feedback`}
//                   className="hover:underline text-lg font-semibold sm:text-xl line-clamp-1"
//                 >
//                   {item.jobPosition}
//                 </Link>
//                 <p className="flex-1 mt-1 text-sm text-gray-500 line-clamp-3">
//                   {item.jobDescription}
//                 </p>
//                 <div className="flex w-full items-center justify-between gap-1 text-gray-500">
//                   <div className="flex items-center gap-2">
//                     <span>
//                       <Briefcase className="w-4" />
//                     </span>
//                     <p className="text-xs font-medium">
//                       {item.jobExperience} years
//                     </p>
//                   </div>

//                   {/* <Button
//                     className="h-auto text-sm bg-red-600 hover:bg-red-700"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleDelete(item.mockId);
//                     }}
//                   >
//                     Delete
//                   </Button> */}
//                   <AlertDialog>
//                     <AlertDialogTrigger className="text-white px-2 py-1 rounded-md bg-red-600 hover:bg-red-700">
//                       Delete
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently
//                           delete your account and remove your data from our
//                           servers.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleDelete(item.mockId);
//                           }}
//                         >
//                           Delete
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default DashboardInterview;
