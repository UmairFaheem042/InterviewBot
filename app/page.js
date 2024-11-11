import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="max-w-screen-xl w-full min-h-screen flex flex-col items-center justify-center gap-5 mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="block text-teal-600">
          <img
            src="/logo.svg"
            alt="Logo404"
            className="w-[100px] md:w-[200px]"
          />
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
          Ace Your Interviews with AI-Powered Practice
        </h1>
        <p className="text-md md:text-lg text-center mb-8">
          Get ready for any interview with tailored, real-time feedback on your
          responses. Our AI-driven platform helps you practice effectively,
          boosting your confidence and readiness.
        </p>
        <div className="flex gap-4">
          <Link href="/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
            <Button className="min-w-[100px]">Get Started</Button>
          </Link>
          <Link href="/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
            <Button className="min-w-[100px]">Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
