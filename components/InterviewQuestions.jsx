"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import RecordAnswer from "./RecordAnswer";
import { Button } from "./ui/button";

const InterviewQuestions = ({ data }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
  const interviewId = data?.mockId || "";

  useEffect(() => {
    setInterviewData(JSON.parse(data.jsonMockResp));
  }, []);

  console.log(activeQuestionIndex);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <Questions
          interviewData={interviewData}
          setActiveQuestionIndex={setActiveQuestionIndex}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswer
          interviewData={interviewData}
          activeQuestionIndex={activeQuestionIndex}
          interviewId={interviewId}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:gap-5 sm:justify-between">
        <Button
          className="min-w-[100px]"
          onClick={() => {
            if (activeQuestionIndex > 1) {
              setActiveQuestionIndex((prev) => prev - 1);
            }
          }}
          disabled={activeQuestionIndex === 1}
        >
          Previous
        </Button>
        <Button
          className="min-w-[100px] bg-red-500 hover:bg-red-400"
          onClick={() => {
            console.log("Ending interview...");
          }}
        >
          End Interview
        </Button>
        <Button
          className="min-w-[100px]"
          onClick={() => {
            if (activeQuestionIndex < 10) {
              setActiveQuestionIndex((prev) => prev + 1);
            }
          }}
          disabled={activeQuestionIndex === 10}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InterviewQuestions;
