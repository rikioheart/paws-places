import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/SiteChrome";
import { submitContact } from "@/lib/forms.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — La Voix du Chien" },
      { name: "description", content: "Une question, un partenariat, envie de devenir bénévole ? Contactez l'association La Voix du Chien." },
      { property: "og:title", content: "Contacter La Voix du Chien" },
      { property: "og:description", content: "Écrivez-nous, nous vous répondrons avec plaisir." },
    ],
  }),
  component: Contact,
});

const SUBJECTS = ["Question générale", "Devenir partenaire", "Référencer mon activité", "Bénévolat", "Autre"];

function Contact() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("loading");
    try {
      await submitContact({ data: { name: String(f.get("name")), email: String(f.get("email")), subject, message: String(f.get("message")) } });
      setState("done");
    } catch {
      setState("error");
    }
  };
  const field = "w-full rounded-2xl border bg-background px-5 py-4 outline-none transition focus:ring-2 focus:ring-ring";
  return (
    <>
      <PageHero kicker="Contact" title="Un mot, une idée, une truffe à présenter ?" />
      <section className="mx-auto max-w-3xl px-6 py-12">
        {state === "done" ? (
          <div className="rounded-3xl bg-card p-10 text-center shadow-lg">
            <CheckCircle2 className="mx-auto h-14 w-14 text-cat-educ" />
            <h2 className="mt-4 text-3xl font-semibold">Merci, message bien reçu !</h2>
            <p className="mt-2 text-muted-foreground">Nous revenons vers vous très vite.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 shadow-lg md:p-10">
            <p className="mb-3 font-semibold">C'est à propos de…</p>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button type="button" key={s} onClick={() => setSubject(s)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${subject === s ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-border"}`}>{s}</button>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input name="name" required maxLength={120} placeholder="Votre nom" className={field} />
              <input name="email" type="email" required maxLength={255} placeholder="Votre email" className={field} />
            </div>
            <textarea name="message" required maxLength={4000} rows={6} placeholder="Votre message…" className={`${field} mt-4 resize-none`} />
            {state === "error" && <p className="mt-3 text-destructive">L'envoi a échoué, merci de réessayer.</p>}
            <button disabled={state === "loading"} className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground transition hover:scale-105 disabled:opacity-60">
              {state === "loading" ? "Envoi…" : "Envoyer"} <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </section>
    </>
  );
}
