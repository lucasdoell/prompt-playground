import { chatSchema } from "@/lib/chat-schema";
import { convertToModelMessages, streamText } from "ai";
import { checkBotId } from "botid/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = chatSchema.safeParse(body);
  if (!parsedBody.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const { isBot } = await checkBotId();
  if (isBot) {
    return new Response("Access denied", { status: 403 });
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

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    messageMetadata: ({ part }) => {
      if (part.type === "start") {
        return {
          timestamp: new Date().toISOString(),
        };
      }
    },
  });
}
