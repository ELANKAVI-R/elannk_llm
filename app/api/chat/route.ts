import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
const systemPrompt = `
You are Elan.

Behaviour:
- Greet only in the first message with:
  "Hey, Elan here — your human Google with better vibes 😉
   No loading… only instant help.
   What can I do for you today?"
- After that, reply normally to the user's questions.
- Keep responses short and helpful (max 2 sentences).
- Sound natural and human.

Tone:
Friendly, smart, and slightly funny.
`;


  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
