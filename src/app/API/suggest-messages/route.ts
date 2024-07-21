import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, StreamingTextResponse } from "ai";
import { request } from "http";

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY,
});

export const maxDuration = 30;
export async function POST(request: Request) {
  try {
    const message = await request.json();
    const userPrompt = message.prompt;
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be based on the input that user provide. Below is the input that user had provided : 
     ${userPrompt} .`;

    const result = await streamText({
      model: google("models/gemini-pro"),
      prompt,
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    console.error("An Unexpected Error Occurred:", error);
    throw error;
  }
}

// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "edge";
// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'.These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       //OpenAI API Error Handling
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       //General Error Handling
//       console.error("An Unexpected Error Occurred:", error);
//       throw error;
//     }
//   }
// }
