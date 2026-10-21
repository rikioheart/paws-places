import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Tag, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideDownload } from "@/components/GuideDownload";
import { AudienceJourneys } from "@/components/AudienceJourneys";
import hero from "@/assets/hero.jpg";
import asso from "@/assets/asso.jpg";
import { CATEGORIES, MEMBERSHIP_URL, PROS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Voix du Chien — Association canine & activités en 77, 45, 89, 91" },
      { name: "description", content: "Un réseau solidaire pour mieux comprendre votre chien : éducateurs canins, balades, ateliers et conseils en Seine-et-Marne, Loiret, Yonne et Essonne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "La Voix du Chien — Association canine" },
      { property: "og:description", content: "Carte des pros canins, balades collectives et partenaires éthiques en 77, 45, 89 et 91." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Organization", name: "La Voix du Chien", foundingDate: "2024-07-24",
      founder: ["Océane Ripoll", "Marie Berrier", "Aurélien Ragot"].map(name => ({ "@type": "Person", name })),
      areaServed: ["Seine-et-Marne", "Loiret", "Yonne", "Essonne"],
      description: "Association réunissant familles et professionnels autour de l’éducation canine positive et du bien-être des chiens.",
      sameAs: [MEMBERSHIP_URL],
    }) }],
  }),
  component: Index,
});

function Index() {

  return (
    <>
      <section className="relative h-[80svh] min-h-[560px] max-h-[850px] overflow-hidden">
        <img src={hero} alt="Balade collective de chiens en forêt au coucher du soleil" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 text-primary-foreground">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-card/20 px-4 py-1.5 text-sm backdrop-blur">🐾 Seine-et-Marne · Loiret · Yonne · Essonne</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
            La Voix <em className="text-sun">du Chien</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Mieux comprendre votre chien, partager une balade et trouver du soutien : rejoignez un collectif de familles et de professionnels où chacun apporte son expérience.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/agenda">Vivre des moments avec mon chien <ArrowRight /></Link></Button>
            <Button asChild variant="secondary" size="lg"><Link to="/contact" search={{ profil: "professionnel" }}>Rejoindre le réseau professionnel</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-6xl gap-4 px-6 md:grid-cols-3 relative z-10">
        {[
          { to: "/annuaire" as const, icon: MapPin, t: `${PROS.length} professionnels de terrain`, d: "Éducateurs, photographes, bien-être, pet sitting, secours." },
          { to: "/partenaires" as const, icon: Tag, t: "Boutiques & avantages", d: "Boutiques, créations artisanales et avantages publiés par nos partenaires." },
          { to: "/agenda" as const, icon: CalendarDays, t: "Balades collectives", d: "Se rencontrer, observer et apprendre à mieux vivre ensemble." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="group rounded-3xl border bg-card p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
            <c.icon className="h-8 w-8 text-accent" />
            <p className="mt-4 font-display text-2xl">{c.t}</p>
            <p className="mt-1 text-muted-foreground">{c.d}</p>
            <ArrowRight className="mt-4 h-5 w-5 transition group-hover:translate-x-2" />
          </Link>
        ))}
      </section>

      <div className="mt-14"><AudienceJourneys /></div>
      <section className="mx-auto mt-16 max-w-6xl px-6">
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
          <p className="mt-5 text-lg text-muted-foreground">Depuis 2024, familles, bénévoles et professionnels font vivre La Voix du Chien. Des expériences qui se croisent, des savoirs qui circulent et des projets qui prennent forme ensemble : le collectif grandit grâce à chaque participation.</p>
          <div className="mt-8 rounded-3xl bg-sun/40 p-6">
            <p className="font-display text-2xl">📘 Partir en vacances avec son chien</p>
            <p className="mt-1 text-muted-foreground">Notre guide gratuit : papiers, trousse, trajet, hébergement.</p>
            <div className="mt-4"><GuideDownload /></div>
          </div>
          <Link to="/association" className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">Découvrir notre histoire <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <section className="mt-20 bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-semibold text-accent">Une place pour chaque duo</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold">Vous n’avez pas à avancer seul avec vos questions.</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Une arrivée à la maison, une émotion difficile, l’envie de partager une balade : prenons le temps de trouver le bon accompagnement.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/services" className="font-semibold text-accent underline">Découvrir les accompagnements</Link>
            <Link to="/blog" className="font-semibold text-accent underline">Lire nos articles</Link>
            <a href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">Adhérer sur HelloAsso ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
