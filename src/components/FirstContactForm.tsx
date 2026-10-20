import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitFirstContact } from "@/lib/forms.functions";
import { PARTICULIER_SECTIONS, PRO_SECTIONS, RGPD_NOTICE, type Question } from "@/lib/first-contact";

type Audience = "particulier" | "professionnel";
const field = "w-full rounded-2xl border bg-background px-5 py-3 outline-none transition focus:ring-2 focus:ring-ring";

function QuestionField({ q }: { q: Question }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-semibold">{q.label}</legend>
      {q.help && <p className="text-sm text-muted-foreground">{q.help}</p>}
      {q.type === "text" && <input name={q.id} maxLength={500} className={field} />}
      {q.type === "textarea" && <textarea name={q.id} maxLength={2000} rows={3} className={`${field} resize-none`} />}
      {(q.type === "radio" || q.type === "checkbox") && (
        <div className="mt-1 flex flex-wrap gap-2">
          {q.options?.map((o) => (
            <label key={o} className="cursor-pointer">
              <input type={q.type} name={q.id} value={o} className="peer sr-only" />
              <span className="inline-block rounded-full border bg-secondary px-4 py-2 text-sm transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">{o}</span>
            </label>
          ))}
        </div>
      )}
      {q.other && <input name={`${q.id}__other`} maxLength={300} placeholder="Autre :" className={`${field} mt-1`} />}
    </fieldset>
  );
}

export function FirstContactForm({ initial = "particulier", lockAudience = false }: { initial?: Audience; lockAudience?: boolean }) {
  const [audience, setAudience] = useState<Audience>(initial);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const sections = audience === "particulier" ? PARTICULIER_SECTIONS : PRO_SECTIONS;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const answers: Record<string, string | string[]> = {};
    for (const s of sections) for (const q of s.questions) {
      const values = f.getAll(q.id).map(String).filter(Boolean);
      const other = q.other ? String(f.get(`${q.id}__other`) || "").trim() : "";
      if (other) values.push(`Autre : ${other}`);
      if (!values.length) continue;
      answers[q.id] = q.type === "checkbox" || values.length > 1 ? values : values[0]!;
    }
    setState("loading");
    try {
      await submitFirstContact({ data: { audience, name: String(f.get("name")), email: String(f.get("email")), phone: String(f.get("phone") || "") || undefined, answers } });
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done")
    return (
      <div className="rounded-3xl bg-card p-10 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h2 className="mt-4 text-3xl font-semibold">Merci, c’est bien reçu !</h2>
        <p className="mt-2 text-muted-foreground">Nous lisons votre réponse avec attention et revenons vers vous rapidement.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 shadow-lg md:p-10">
      {!lockAudience && (
        <div className="mb-8">
          <p className="mb-3 font-semibold">Vous êtes…</p>
          <div className="grid grid-cols-2 gap-2 rounded-full bg-secondary p-1">
            {(["particulier", "professionnel"] as const).map((a) => (
              <button type="button" key={a} onClick={() => setAudience(a)} aria-pressed={audience === a} className={`rounded-full px-4 py-3 text-sm font-semibold transition ${audience === a ? "bg-primary text-primary-foreground shadow" : "hover:bg-border"}`}>
                {a === "particulier" ? "Particulier" : "Professionnel"}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        <input name="name" required maxLength={120} placeholder={audience === "particulier" ? "Nom et prénom *" : "Nom et prénom du contact *"} className={field} />
        <input name="email" type="email" required maxLength={255} placeholder="E-mail *" className={field} />
        <input name="phone" maxLength={30} placeholder="Téléphone" className={field} />
      </div>
      {sections.map((s) => (
        <section key={`${audience}-${s.title}`} className="mt-10 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            {s.intro && <p className="mt-1 text-muted-foreground">{s.intro}</p>}
          </div>
          {s.questions.map((q) => <QuestionField key={q.id} q={q} />)}
        </section>
      ))}
      <p className="mt-10 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">{RGPD_NOTICE}</p>
      {state === "error" && <p className="mt-3 text-destructive">L’envoi a échoué, merci de vérifier vos informations et de réessayer.</p>}
      <button disabled={state === "loading"} className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground transition hover:scale-105 disabled:opacity-60">
        {state === "loading" ? "Envoi…" : "Envoyer"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
