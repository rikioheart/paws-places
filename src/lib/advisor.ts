import { z } from "zod";

export const ADVISOR_STORAGE_KEY = "lvc-advisor-conversation-v1";
export const advisorMessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["user", "assistant"]),
  parts: z.array(z.object({ type: z.literal("text"), text: z.string() })).min(1),
});
export type AdvisorMessage = z.infer<typeof advisorMessageSchema>;
export const advisorRequestSchema = z.object({
  messages: z.array(advisorMessageSchema).min(1).refine(
    (messages) => messages.at(-1)?.role === "user",
    "Le dernier message doit venir du visiteur.",
  ),
}).refine((data) => JSON.stringify(data).length <= 120_000, "Échange trop long.");
export const advisorEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("delta"), text: z.string() }),
  z.object({ type: z.literal("done") }),
  z.object({ type: z.literal("error"), message: z.string() }),
]);
export function messageText(message: AdvisorMessage) {
  return message.parts.map((part) => part.text).join("");
}
export function restoreConversation(raw: string | null): AdvisorMessage[] {
  if (!raw) return [];
  try {
    const result = z.array(advisorMessageSchema).safeParse(JSON.parse(raw));
    return result.success ? result.data : [];
  } catch { return []; }
}