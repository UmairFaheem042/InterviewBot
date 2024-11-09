import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

const RecordAnswer = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [recordedAnswer, setRecordedAnswer] = useState("");

  useEffect(() => {
    results.map((result) =>
      setRecordedAnswer((prev) => prev + result?.transcript)
    );
  }, [results]);


  return (
    <div className="flex flex-col gap-3 items-center justify-around p-5 border rounded-lg">
      {/* <Webcam/> */}
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
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
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
    </div>
  );
};

export default RecordAnswer;
