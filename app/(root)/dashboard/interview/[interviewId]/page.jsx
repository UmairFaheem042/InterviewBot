import React from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import Interviews from "../../../../../components/Interviews";

const InterviewPage = async ({ params }) => {
  const interviewId = params.interviewId;

  const data = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  return (
    <>
      <Interviews data={data} interviewId={interviewId}/>
    </>
  );
};

export default InterviewPage;
