"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { GeneratePrompt } from "../utils/PromptGeneration";
import { db } from "../utils/db";
import { MockInterview } from "../utils/schema";
import { LoaderCircleIcon, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interviewResponse, setInterviewResponse] = useState([]);
  const { user } = useUser();

  async function handleStartInterview(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await GeneratePrompt(jobRole, jobDesc, jobExp);
    console.log(result.sampleQuestions);
    setInterviewResponse(result.sampleQuestions);

    // error
    if (result) {
      try {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(result.sampleQuestions),
            jobPosition: jobRole,
            jobDescription: jobDesc,
            jobExperience: jobExp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log(resp);
        if (resp) {
          // setOpenDialog(false);
          // setJobRole("");
          // setJobDesc("");
          // setJobExp("");
          formReset();
        }
      } catch (error) {
        console.log("Error while saving interview to DB: ", error);
      }
    } else {
      console.log("No result generated hence not able to save to DB");
    }
    setIsLoading(false);

    // setOpenDialog((prev) => !prev);
  }

  function formReset() {
    setOpenDialog(false);
    setJobRole("");
    setJobDesc("");
    setJobExp("");
  }
  return (
    <div className="">
      <Dialog open={openDialog} className="relative">
        <DialogTrigger asChild onClick={() => setOpenDialog((prev) => !prev)}>
          <Button>+ New Interview</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 outline-none  data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
              onClick={formReset}
            >
              <X className="h-4 w-4" />
            </button>
            <DialogTitle className="text-xl font-bold">
              Customize your Interview
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-400 font-normal">
              Add details about the job interview you are preparing
            </DialogDescription>
            <form onSubmit={handleStartInterview}>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="font-normal text-[0.9rem] text-gray-400"
                >
                  Job Role or Position
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  required
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="font-normal text-[0.9rem] text-gray-400"
                >
                  Job Description or Tech Stack
                </label>
                <Textarea
                  placeholder="e.g. React, Express, NodeJs, MongoDB etc"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="font-normal text-[0.9rem] text-gray-400"
                >
                  Years of Experience
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 2"
                  min={0}
                  max={50}
                  value={jobExp}
                  onChange={(e) => setJobExp(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4 flex justify-between gap-4">
                {/* <DialogTrigger asChild> */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => {
                    // setOpenDialog((prev) => !prev);
                  }}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircleIcon className="animate-spin" />
                      Preparing Interview
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
                {/* </DialogTrigger> */}
                <DialogTrigger asChild onClick={formReset}>
                  <Button className="bg-red-500 text-white hover:bg-red-600">
                    Cancel
                  </Button>
                </DialogTrigger>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* </div> */}
    </div>
  );
};

export default AddNewInterview;
