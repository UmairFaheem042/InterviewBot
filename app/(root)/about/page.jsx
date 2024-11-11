import Link from "next/link";
import React from "react";
import { Button } from "../../../components/ui/button";

const page = () => {
  return (
    <section className="max-w-screen-xl  mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl min-h-[80vh] flex items-center justify-center">
        <div className=" mx-auto flex flex-col gap-10 text-center">
          <div>
            <p className="text-2xl md:text-4xl">Prepare for Success with</p>
            <strong className="md:text-6xl text-4xl font-extrabold text-pink-500 sm:block">
              AI-Driven Mock Interviews
            </strong>
            <p className="mt-4 text-sm md:text-md">
              Our platform offers realistic, AI-powered mock interviews to help
              you practice and improve your interview skills. Whether you're a
              beginner or a seasoned professional, our tool helps you feel
              prepared and confident in any interview setting.
            </p>
          </div>

          <Link href="/dashboard">
            <Button>Go To Dashboard</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
