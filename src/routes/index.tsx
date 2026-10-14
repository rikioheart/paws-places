import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Tag, CalendarDays, Download } from "lucide-react";
import hero from "@/assets/hero.jpg";
import asso from "@/assets/asso.jpg";
import { CATEGORIES, EVENTS, PROS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Voix du Chien — Association canine 77, 45, 89, 91" },
      { name: "description", content: "Trouvez éducateurs, pet sitters et pros du bien-être canin, rejoignez nos balades collectives et profitez des codes promo de nos partenaires éthiques." },
      { property: "og:title", content: "La Voix du Chien — Association canine" },
      { property: "og:description", content: "Carte des pros canins, balades collectives et partenaires éthiques en 77, 45, 89 et 91." },
    ],
  }),
  component: Index,
});

function Index() {
  const next = EVENTS[0];
  return (
    <>
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <img src={hero} alt="Balade collective de chiens en forêt au coucher du soleil" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 text-primary-foreground">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-card/20 px-4 py-1.5 text-sm backdrop-blur">🐾 Seine-et-Marne · Loiret · Yonne · Essonne</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-8xl">
            Donnons de la <em className="text-sun">voix</em> à nos chiens.
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Une communauté locale pour trouver les bons professionnels, partager des balades et vivre mieux avec son compagnon.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/annuaire" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-xl transition hover:scale-105">Explorer la carte <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/agenda" className="rounded-full border border-primary-foreground/50 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-card/20">Prochaines balades</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-6xl gap-4 px-6 md:grid-cols-3 relative z-10">
        {[
          { to: "/annuaire" as const, icon: MapPin, t: `${PROS.length} professionnels`, d: "Éducateurs, photographes, bien-être, pet sitting, secours." },
          { to: "/partenaires" as const, icon: Tag, t: "Codes promo exclusifs", d: "Des boutiques éthiques qui soutiennent l'association." },
          { to: "/agenda" as const, icon: CalendarDays, t: "Balades collectives", d: `Prochaine : ${new Date(next.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="group rounded-3xl border bg-card p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
            <c.icon className="h-8 w-8 text-accent" />
            <p className="mt-4 font-display text-2xl">{c.t}</p>
            <p className="mt-1 text-muted-foreground">{c.d}</p>
            <ArrowRight className="mt-4 h-5 w-5 transition group-hover:translate-x-2" />
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-4xl font-semibold md:text-5xl">Qui cherchez-vous ?</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((k) => (
            <Link key={k} to="/annuaire" search={{ cat: k }} className="flex items-center gap-3 rounded-full border-2 bg-card px-6 py-4 text-lg font-medium transition hover:-translate-y-1" style={{ borderColor: CATEGORIES[k].color }}>
              <span className="text-2xl">{CATEGORIES[k].emoji}</span>{CATEGORIES[k].label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <img src={asso} alt="Bénévole de l'association avec un chien" width={1200} height={1408} loading="lazy" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl md:rotate-[-2deg]" />
        <div>
          <p className="font-semibold uppercase tracking-widest text-accent">L'association</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Des humains au service des chiens.</h2>
          <p className="mt-5 text-lg text-muted-foreground">La Voix du Chien rassemble passionnés, bénévoles et professionnels pour informer, relier et accompagner chaque famille dans sa vie avec son chien.</p>
          <div className="mt-8 rounded-3xl bg-sun/40 p-6">
            <p className="font-display text-2xl">📘 Partir en vacances avec son chien</p>
            <p className="mt-1 text-muted-foreground">Notre guide gratuit : papiers, trousse, trajet, hébergement.</p>
            <a href="/guide-vacances-avec-son-chien.pdf" download className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"><Download className="h-4 w-4" /> Télécharger le PDF</a>
          </div>
          <Link to="/association" className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">Découvrir notre histoire <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
