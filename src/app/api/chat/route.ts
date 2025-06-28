import { chatSchema } from "@/lib/chat";
import { convertToModelMessages, streamText } from "ai";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = chatSchema.safeParse(body);
  if (!parsedBody.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const { messages, model, system, temperature, topP, topK, maxOutputTokens } =
    parsedBody.data;

  const result = streamText({
    messages: convertToModelMessages(messages),
    model,
    system,
    temperature,
    topP,
    topK,
    maxOutputTokens,
  });

  return result.toUIMessageStreamResponse();
}
