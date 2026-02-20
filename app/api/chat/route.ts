import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
const syscontext = `HOD available: 10:00am – 1:00pm
Lunch break: 1:00pm – 2:00pm
Cabin is on 2nd floor`;

const systemPrompt = `You are an assistant outside the HOD cabin,
you ask students their purpose and allow them based on availability.
Always be crisp, max 2 sentences.
Following is the context:
${syscontext}`;


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
