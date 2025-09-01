import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ruleBasedReply } from "../../../lib/rules";
import { llmReply } from "../../../lib/llm";

const BodySchema = z.object({ message: z.string().min(1, "message is required") });
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { message } = BodySchema.parse(json);

  const mode = process.env.CHAT_MODE === "llm" ? "llm" : "rules";
  const reply = mode === "llm" ? await llmReply(message) : ruleBasedReply(message);
  return NextResponse.json({ reply }, { status: 200 });
}
