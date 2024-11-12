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

const DashboardInterview = ({ mockId, setIsLoading, fetchData }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleDelete(mockId) {
    try {
      setIsLoading(true);
      await db.delete(UserResponse).where(eq(UserResponse.mockIdRef, mockId));
      await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));
      console.log(
        `Interview with mockId: ${mockId} and its responses have been deleted.`
      );

      setOpen(false);
      toast("Interview deleted successfully");

      
      fetchData();
    } catch (error) {
      console.error("Error deleting interview and responses:", error);
      toast("An error occurred!!!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          onClick={() => setOpen(true)}
          className=" font-medium text-sm text-white px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[0.8rem] md:text-[0.9rem]">
              This action cannot be undone. This will permanently interview
              record from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)} className="text-[0.8rem] md:text-[0.9rem]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete(mockId);
              }}
              className="text-[0.8rem] md:text-[0.9rem]"
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
