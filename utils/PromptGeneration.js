import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const GeneratePrompt = async (jobRole, jobDesc, jobExp) => {
  const chatSession = model.startChat({
    generationConfig,
  });

  const prompt = `Generate a JSON response for a mock interview based on the following criteria:
        Job Position/Role: ${jobRole}
        Job Description/Tech Stack: ${jobDesc}
        Years of Experience: ${jobExp}
        The JSON should have this structure:
        {
            "jobPosition": "string",
            "description": "string",
            "experienceLevel": "integer",
            "sampleQuestions": [
                {
                "question": "string",
                "answer": "string"
                }
            ]
        } 
        Please include at least ${process.env.NEXT_PUBLIC_QUESTIONS_COUNT} questions with answers, relevant to the job role and tech stack.`;
  try {
    const result = await chatSession.sendMessage(prompt);
    const mockInterview = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    return JSON.parse(mockInterview);
  } catch (error) {
    console.log(error.message);
  }
};
