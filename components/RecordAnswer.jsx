import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast, Toaster } from "sonner";
import { db } from "../utils/db";
import { FeedBackPrompt } from "../utils/PromptGeneration";
import { UserResponse } from "../utils/schema";
import moment from "moment/moment";
import { useUser } from "@clerk/nextjs";

const RecordAnswer = ({
  interviewData,
  activeQuestionIndex,
  interviewId,
  markAsAnswered,
  isAnswered,
}) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const { user } = useUser();

  const [recordedAnswer, setRecordedAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedIndex = sessionStorage.getItem("activeQuestionIndex");
    if (savedIndex) {
      markAsAnswered(Number(savedIndex));
    }
  }, []);

  useEffect(() => {
    if (interimResult) {
      setRecordedAnswer((prev) => prev + interimResult);
    }
  }, [interimResult]);

  useEffect(() => {
    if (results.length > 0) {
      setRecordedAnswer(
        (prev) => prev + results.map((result) => result?.transcript).join(" ")
      );
    }
  }, [results]);

  async function saveUserAnswers() {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();

      if (interimResult?.length < 10) {
        setLoading(false);
        toast("Your answer is too short, please elaborate more");
        return;
      }

      setTimeout(async () => {
        try {
          const result = await FeedBackPrompt(
            interviewData[activeQuestionIndex - 1]?.question,
            interimResult
          );
          const resp = await db.insert(UserResponse).values({
            mockIdRef: interviewId,
            question: interviewData[activeQuestionIndex - 1]?.question,
            correctAnswer: interviewData[activeQuestionIndex - 1]?.answer,
            userAnswer: interimResult,
            feedback: result?.feedback,
            rating: result?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          });

          if (resp) {
            toast("Answer Saved Successfully");
            markAsAnswered(activeQuestionIndex);
            sessionStorage.setItem("activeQuestionIndex", activeQuestionIndex);
          }
        } catch (error) {
          toast("Failed to save answer. Please try again.");
          setResults([]);
        } finally {
          setLoading(false);
          setRecordedAnswer("");
        }
      }, 500);
    } else {
      startSpeechToText();
    }
    setRecordedAnswer("");
    setResults([]);
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-around p-5 border rounded-lg">
      <Webcam
        className="bg-secondary"
        mirrored="true"
        style={{
          height: "60vh",
          width: "100%",
          zIndex: 10,
        }}
      />
      <Button
        variant="outline"
        onClick={saveUserAnswers}
        disabled={loading || isAnswered}
      >
        {isRecording ? (
          <span className="text-red-500 flex items-center gap-2">
            <Mic />
            Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Toaster />
    </div>
  );
};

export default RecordAnswer;
