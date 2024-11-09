"use client";

import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import Link from "next/link";

const Interviews = ({ data, interviewId }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [isCamOpen, setIsCamOpen] = useState(false);

  useEffect(() => {
    setInterviewData(data[0]);
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto md:py-6 py-12 px-4 sm:px-6 md:px-8 flex flex-col">
        <h2 className="font-bold text-3xl text-center">Let us get Started</h2>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 ">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col items-center gap-5  rounded-lg md:order-last">
                {!isCamOpen && (
                  <div className="text-sm flex items-center p-5 rounded-lg border-yellow-300 border bg-yellow-100">
                    <Lightbulb className="text-yellow-500 w-[20px]" />
                    <p className="text-yellow-500">
                      Enable webcam & microphone for interview to start
                    </p>
                  </div>
                )}
                {isCamOpen ? (
                  <>
                    <Webcam
                      className=""
                      onUserMedia={() => setIsCamOpen(true)}
                      onUserMediaError={() => setIsCamOpen(false)}
                      mirrored={true}
                      style={{
                        height: 300,
                        width: 300,
                        borderRadius: "1rem",
                      }}
                    />
                    <Button
                      variant="outline"
                      className=" text-black  hover:underline outline-none"
                      onClick={() => setIsCamOpen(false)}
                    >
                      Disable Camera and Microphone
                    </Button>
                  </>
                ) : (
                  <>
                    <WebcamIcon className="h-60 w-60 p-12 rounded-lg border bg-secondary" />
                    <Button
                      variant="outline"
                      className=" text-black hover:underline outline-none"
                      onClick={() => setIsCamOpen(true)}
                    >
                      Enable Camera and Microphone
                    </Button>
                  </>
                )}
              </div>

              <div className="flex flex-col  items-start  justify-start">
                <h2 className="font-semibold text-2xl md:text-start text-center mb-6">
                  Interview Details
                </h2>
                <div className="flex flex-col gap-5 w-full">
                  <p className="flex gap-2 text-gray-500 font-normal">
                    Job Position or Job Role:
                    <span className="font-semibold text-pink-500">
                      {interviewData?.jobPosition}
                    </span>
                  </p>
                  <p className="flex gap-2 text-gray-500 font-normal">
                    Years of Experience:
                    <span className="font-semibold text-pink-500">
                      {interviewData?.jobExperience}
                    </span>
                  </p>
                  <p className="flex flex-col text-gray-500 font-normal">
                    Job Description or Tech Stack:
                    <span className="font-semibold text-pink-500">
                      {interviewData?.jobDescription}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex item-center justify-center">
          <Button disabled={!isCamOpen} className=" w-min p-0 h-auto">
            <Link
              href={`/dashboard/interview/${interviewId}/start`}
              className="px-4 py-3  sm:rounded-md sm:px-3  lg:rounded-md lg:px-8"
            >
              Start Interview
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Interviews;
