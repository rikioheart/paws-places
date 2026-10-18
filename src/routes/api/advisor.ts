import { createFileRoute } from "@tanstack/react-router";
import { advisorRequestSchema, messageText } from "@/lib/advisor";

export const Route = createFileRoute("/api/advisor")({
  server: { handlers: { POST: async ({ request }) => {
    // Public visitor tool: no private reads, writes or external actions.
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) {
      return Response.json({ message: "Requête non autorisée." }, { status: 403 });
    }
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ message: "Requête invalide." }, { status: 415 });
    }
    const raw = await request.text();
    if (raw.length > 120_000) return Response.json({ message: "Cet échange est trop long. Commencez un nouvel échange." }, { status: 413 });
    let input: unknown;
    try { input = JSON.parse(raw); } catch { return Response.json({ message: "Requête invalide." }, { status: 400 }); }
    const parsed = advisorRequestSchema.safeParse(input);
    if (!parsed.success) return Response.json({ message: "Échange invalide ou trop long." }, { status: 400 });
    const { streamResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const { advisorInstructions } = await import("@/lib/advisor-knowledge");
    const abort = new AbortController();
    request.signal.addEventListener("abort", () => abort.abort(), { once: true });
    function safeError(error: unknown) {
      if (error instanceof GatewayError) {
        console.error("advisor_gateway", { code: error.code, httpStatus: error.httpStatus, outcome: error.outcome, recovery: error.recovery, remote: error.remote, ids: error.ids });
        if (error.code === "payment_required") return "Le conseiller est suspendu faute de crédits. Vous pouvez contacter l’association.";
        if (error.code === "permission_denied") return "Le conseiller est indisponible : l’accès au modèle doit être autorisé par le propriétaire du site.";
        if (error.code === "rate_limited") return "Le conseiller reçoit trop de demandes. Veuillez patienter avant de réessayer.";
      }
      return "La réponse n’a pas pu être terminée. Votre demande est conservée ; vous pouvez contacter l’association.";
    }
    try {
      const events = await streamResponse({
        model: "openai/gpt-6-astra",
        instructions: advisorInstructions(),
        input: parsed.data.messages.map((message) => ({ role: message.role, content: messageText(message) })),
      }, { signal: abort.signal });
      const encoder = new TextEncoder();
      const body = new ReadableStream<Uint8Array>({
        async start(controller) {
          let complete = false;
          const emit = (event: object) => { if (!abort.signal.aborted) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n")); };
          try {
            for await (const event of events) {
              if (event.type === "response.output_text.delta") emit({ type: "delta", text: event.delta });
              if (event.type === "response.refusal.delta") emit({ type: "delta", text: event.delta });
              if (event.type === "response.completed") complete = true;
            }
            if (complete) emit({ type: "done" });
            else emit({ type: "error", message: "La réponse est incomplète. Votre demande est conservée." });
          } catch (error) { if (!abort.signal.aborted) emit({ type: "error", message: safeError(error) }); }
          finally { if (!abort.signal.aborted) controller.close(); }
        },
        cancel() { abort.abort(); },
      });
      return new Response(body, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
    } catch (error) {
      return Response.json({ message: safeError(error) }, { status: 503 });
    }
  } } },
});