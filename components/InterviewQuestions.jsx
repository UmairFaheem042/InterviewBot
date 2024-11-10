"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import RecordAnswer from "./RecordAnswer";
import { Button } from "./ui/button";
import Link from "next/link";

const InterviewQuestions = ({ data }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const interviewId = data?.mockId || "";

  useEffect(() => {
    setInterviewData(JSON.parse(data.jsonMockResp));
  }, []);

  const markAsAnswered = (index) => {
    setAnsweredQuestions((prev) => new Set(prev).add(index));
  };

  const canNavigatePrevious =
    activeQuestionIndex > 1 && !answeredQuestions.has(activeQuestionIndex - 1);

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
          markAsAnswered={markAsAnswered}
          isAnswered={answeredQuestions.has(activeQuestionIndex)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:gap-5 sm:justify-between">
        {/* <Button
          className="min-w-[100px]"
          onClick={() => {
            if (canNavigatePrevious) {
              setActiveQuestionIndex((prev) => prev - 1);
            }
          }}
          disabled={!canNavigatePrevious}
        >
          Previous
        </Button> */}

        <Button
          className="min-w-[100px]"
          onClick={() => {
            if (activeQuestionIndex < interviewData.length) {
              setActiveQuestionIndex((prev) => prev + 1);
            }
          }}
          disabled={activeQuestionIndex >= interviewData.length}
        >
          Next Question
        </Button>
        <Link href={`/dashboard/interview/${interviewId}/feedback`}>
          <Button className="min-w-[100px] bg-red-500 hover:bg-red-400">
            End Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewQuestions;
