import { z } from "zod";

export const chatSchema = z.object({
  id: z.string().min(1),
  /** Messages to send to the chat. */
  messages: z.array(z.any()),
  /** Model to use for the chat. Format: "provider/model" */
  model: z.string().min(1),
  /** The system prompt to use for the chat. */
  system: z.string().optional(),
  /** The temperature to use for the chat. */
  temperature: z.number().default(0.7),
  /** The top p to use for the chat. */
  topP: z.number().optional(),
  /** The top k to use for the chat. */
  topK: z.number().optional(),
  /** The max output tokens to use for the chat. */
  maxOutputTokens: z.number().min(0).optional(),
});
