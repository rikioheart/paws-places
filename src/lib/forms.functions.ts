import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(4000),
});

const regSchema = z.object({
  event_id: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  dog_name: z.string().trim().max(80).optional(),
  participants: z.number().int().min(1).max(10),
});

async function client() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, { auth: { persistSession: false } });
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = await client();
    const { error } = await sb.from("contact_submissions").insert(data);
    if (error) throw new Error("Envoi impossible");
    return { ok: true };
  });

export const registerWalk = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => regSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = await client();
    const { error } = await sb.from("walk_registrations").insert(data);
    if (error) throw new Error("Inscription impossible");
    return { ok: true };
  });

const answerValue = z.union([z.string().trim().max(2000), z.array(z.string().trim().max(300)).max(20)]);
const firstContactSchema = z.object({
  audience: z.enum(["particulier", "professionnel"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  answers: z.record(z.string().max(40), answerValue).refine((a) => Object.keys(a).length <= 60),
});

export const submitFirstContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => firstContactSchema.parse(d))
  .handler(async ({ data }) => {
    const sb = await client();
    const { error } = await sb.from("first_contact_requests").insert(data);
    if (error) throw new Error("Envoi impossible");
    return { ok: true };
  });
