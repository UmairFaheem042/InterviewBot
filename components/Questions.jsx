"use client";

import React, { useState } from "react";

const Questions = ({
  interviewData,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  return (
    <div className="flex flex-col p-5 border rounded-lg">
      <div className="flex flex-wrap gap-5 overflow-x-auto scrollbar-hide">
        {interviewData?.map((question, index) => (
          <h2
            key={index}
            className={`flex-1 text-center ${
              index + 1 === activeQuestionIndex && "!bg-pink-500 text-white"
            } text-xs md:text-sm cursor-pointer px-4 py-2 bg-secondary rounded-lg whitespace-nowrap`}
            onClick={() => setActiveQuestionIndex(index + 1)}
          >
            Question {index + 1}
          </h2>
        ))}
      </div>
      <p className="flex-1 my-7 text-lg font-medium">
        {interviewData[activeQuestionIndex - 1]?.question}
      </p>
      <div className="text-sm flex items-center p-5 rounded-lg border-pink-300 border bg-pink-100">
        <p className="text-pink-500">
          Click on <b>Record Answer</b> when you are ready with an answer. At
          the end of the interview we will give you feedback along with correct
          answers for each question.
        </p>
      </div>
    </div>
  );
};

export default Questions;
