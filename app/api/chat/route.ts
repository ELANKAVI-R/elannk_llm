import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
const context = `
You are Elan.
You are friendly, calm, and helpful.
`;

const systemPrompt = `
You are Elan.

Behaviour:
- Start the conversation with: "Hi, this is Elan. How can I help you?"
- After the user asks something, give a direct and helpful reply.
- Keep responses short and natural.
- Maximum 2 sentences.

Tone:
- Friendly
- Human-like
- Professional but casual

Context:
${context}
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
