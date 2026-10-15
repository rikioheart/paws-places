import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Users, X } from "lucide-react";
import { toast } from "sonner";
import { EVENTS, ACTIVITY_REQUIREMENTS, type WalkEvent } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/SiteChrome";
import { registerWalk } from "@/lib/forms.functions";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda des balades collectives — La Voix du Chien" },
      { name: "description", content: "Balades collectives, ateliers et formations canines en 77, 45, 89 et 91. Inscrivez-vous en ligne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Agenda des balades et activités canines" },
      { property: "og:description", content: "Rejoignez nos prochaines balades collectives avec votre chien." },
    ],
  }),
  component: Agenda,
});

function Agenda() {
  const [kind, setKind] = useState("Tous");
  const [open, setOpen] = useState<WalkEvent | null>(null);
  const kinds = ["Tous", ...new Set(EVENTS.map((e) => e.kind))];
  const list = EVENTS.filter((e) => kind === "Tous" || e.kind === kind);
  return (
    <>
      <PageHero kicker="Agenda" title="On se retrouve pour une balade ?">
        Des rencontres pour découvrir l’univers de votre chien, avec des professionnels passionnés. Les inscriptions ouvrent lorsque les dates sont annoncées.
      </PageHero>
      <section className="mx-auto max-w-5xl px-6 py-12">
        {!EVENTS.length && <div className="border-l-4 border-accent bg-secondary p-7">
          <h2 className="text-3xl font-semibold">Les prochaines dates se préparent.</h2>
          <p className="mt-3 text-muted-foreground">Aucune prochaine date n’est actuellement publiée sur le site officiel. Contactez l’association pour connaître les balades, ateliers et initiations à venir.</p>
          {ACTIVITY_REQUIREMENTS.behavioralAssessmentRequired && <p className="mt-4 text-muted-foreground">Avant toute activité, un bilan comportemental est obligatoire. Un bilan réalisé auprès d’un partenaire peut être réutilisé pour les autres activités.</p>}
          <p className="mt-4 text-muted-foreground">Pour une activité organisée par un partenaire, l’inscription se fait directement auprès de lui.</p>
          <Button asChild className="mt-6"><Link to="/contact">Me renseigner sur les prochaines rencontres</Link></Button>
        </div>}
        <div className="flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button key={k} onClick={() => setKind(k)} className={`rounded-full px-4 py-2 text-sm font-semibold ${kind === k ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>{k}</button>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-5">
          {list.map((e) => {
            const d = new Date(e.date);
            return (
              <article key={e.id} className="flex flex-col gap-5 rounded-3xl border bg-card p-5 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-primary text-center text-primary-foreground">
                  <div>
                    <p className="font-display text-4xl font-bold leading-none">{d.getDate()}</p>
                    <p className="text-sm uppercase">{d.toLocaleDateString("fr-FR", { month: "short" })}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{e.kind} · {e.level}</p>
                  <h2 className="text-2xl font-semibold">{e.title}</h2>
                  <p className="mt-1 text-muted-foreground">{e.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{e.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{e.place} ({e.dept})</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" />{e.spots} places</span>
                  </div>
                </div>
                <button onClick={() => setOpen(e)} className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:scale-105">S'inscrire</button>
              </article>
            );
          })}
        </div>
      </section>
      {open && <RegisterModal ev={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function RegisterModal({ ev, onClose }: { ev: WalkEvent; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await registerWalk({
        data: {
          event_id: ev.id,
          name: String(f.get("name")),
          email: String(f.get("email")),
          phone: String(f.get("phone") || "") || undefined,
          dog_name: String(f.get("dog") || "") || undefined,
          participants: Number(f.get("participants") || 1),
        },
      });
      toast.success("Inscription enregistrée, à bientôt ! 🐾");
      onClose();
    } catch {
      toast.error("Oups, vérifiez vos informations et réessayez.");
    } finally {
      setLoading(false);
    }
  };
  const field = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-3xl bg-card p-6 shadow-2xl animate-in zoom-in-95">
        <button type="button" onClick={onClose} className="absolute right-4 top-4" aria-label="Fermer"><X /></button>
        <p className="text-sm font-semibold text-accent">Inscription</p>
        <h3 className="text-2xl font-semibold">{ev.title}</h3>
        <div className="mt-5 flex flex-col gap-3">
          <input name="name" required maxLength={120} placeholder="Votre nom *" className={field} />
          <input name="email" type="email" required maxLength={255} placeholder="Email *" className={field} />
          <input name="phone" maxLength={30} placeholder="Téléphone" className={field} />
          <div className="flex gap-3">
            <input name="dog" maxLength={80} placeholder="Nom du chien" className={field} />
            <input name="participants" type="number" min={1} max={10} defaultValue={1} className={`${field} w-24`} aria-label="Participants" />
          </div>
        </div>
        <button disabled={loading} className="mt-5 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground disabled:opacity-60">{loading ? "Envoi…" : "Confirmer mon inscription"}</button>
      </form>
    </div>
  );
}
