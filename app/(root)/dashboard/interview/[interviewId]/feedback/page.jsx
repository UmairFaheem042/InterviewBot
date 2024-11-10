import { Button } from "../../../../../../components/ui/button";
import { db } from "../../../../../../utils/db";
import { UserResponse } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

const page = async ({ params }) => {
  const interviewId = params.interviewId;
  let data;
  let overallRating;
  try {
    data = await db
      .select()
      .from(UserResponse)
      .where(eq(UserResponse.mockIdRef, params.interviewId))
      .orderBy(UserResponse.id);

    overallRating = parseFloat(
      (
        data
          .map((item) => parseFloat(item.rating)) // Extract and convert each rating to a number
          .reduce((sum, rating) => sum + rating, 0) / data.length
      ).toFixed(2)
    );
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="min-h-[80vh] flex flex-col gap-4 items-center justify-center">
        <h1 className="font-bold text-3xl md:text-4xl text-green-400">
          Congratulations
        </h1>
        <h2 className="font-semibold text-xl md:text-2xl text-gray-400">
          Here's your feedback
        </h2>
        <div className="  flex flex-col justify-center items-center gap-2">
          {/* <span>Your Rating</span> */}
          <h4 className=" border-4 border-pink-100 rounded-xl p-5 text-pink-300">
            {overallRating ? (
              <>
                <span className="text-4xl text-pink-500 font-semibold">
                  {overallRating}
                </span>
                /10
              </>
            ) : (
              "Nothing to rate"
            )}
          </h4>
        </div>
        <div className="w-full flex flex-col gap-4 transition-all">
          <h1 className="text-gray-400 p-2">
            Below are questions along with the answers and rating.
          </h1>
          {data?.map((item) => (
            <Collapsible key={item.id} className="flex flex-col gap-1">
              <CollapsibleTrigger className="text-start flex justify-between items-center w-full p-2 bg-[rgba(0,0,0,0.03)] rounded-lg">
                {item?.question}
                <ChevronsUpDown />
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-1  ">
                <div className="px-4 py-2 border text-blue-600 font-semibold rounded-lg">
                  <span className="text-blue-800 font-semibold ">
                    Your Rating:{" "}
                  </span>
                  {item.rating}/10
                </div>
                <div className="p-4 bg-pink-100 text-red-600 rounded-lg">
                  {/* <p className="text-red-400"> */}
                  <span className="text-red-800 font-semibold ">
                    Your Answer:{" "}
                  </span>
                  {item.userAnswer}
                </div>
                <div className="p-4 bg-green-100  text-green-600 rounded-lg">
                  <span className="font-semibold text-green-800">
                    Correct Answer:{" "}
                  </span>
                  {item.correctAnswer}
                </div>
                <div className="p-4 bg-yellow-100  text-yellow-600 rounded-lg">
                  <span className="font-semibold text-yellow-800">
                    Feedback:{" "}
                  </span>
                  {item.feedback}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <Button>Go To Dashboard</Button>
      </div>
    </div>
  );
};

export default page;
