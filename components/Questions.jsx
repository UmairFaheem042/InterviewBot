"use client";

import React, { useState } from "react";

const Questions = ({
  interviewData,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  return (
    <div className="flex flex-col p-5 border rounded-lg">
      <div className="hidden md:flex md:flex-wrap md:gap-5 md:overflow-x-auto md:scrollbar-hide">
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
      <p className="flex-1 mb-7 md:my-7 text-lg font-medium">
        {interviewData[activeQuestionIndex - 1]?.question}
      </p>
      <div className="text-sm flex items-center p-5 rounded-lg border-pink-300 border bg-pink-100">
        <p className="text-pink-500">
          Click on <b>Record Answer</b> when you are ready with an answer.
          <br />
          <br />
          <b>Note</b>: You can only record once and can not go back to previous
          questions in any case.
        </p>
      </div>
    </div>
  );
};

export default Questions;
