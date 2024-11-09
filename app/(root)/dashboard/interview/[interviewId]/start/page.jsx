import React from "react";
import { MockInterview } from "../../../../../../utils/schema";
import { db } from "../../../../../../utils/db";
import { eq } from "drizzle-orm";
import InterviewQuestions from "../../../../../../components/InterviewQuestions";

const page = async ({ params }) => {
  const interviewId = params.interviewId;
  const data = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <InterviewQuestions data={data[0]}/>
    </div>
  );
};

export default page;
