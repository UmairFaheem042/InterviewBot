"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import RecordAnswer from "./RecordAnswer";

const InterviewQuestions = ({ data }) => {
  const [interviewData, setInterviewData] = useState([]);

  useEffect(() => {
    setInterviewData(JSON.parse(data.jsonMockResp));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[80vh]">
        <Questions interviewData={interviewData} />
        <RecordAnswer />
      </div>
    </>
  );
};

export default InterviewQuestions;
