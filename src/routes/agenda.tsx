import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ExternalLink, HeartHandshake, Footprints, Lightbulb, Trophy } from "lucide-react";
import { ACTIVITY_REQUIREMENTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/SiteChrome";
import { RINTINTIN_URL } from "@/lib/first-contact";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Activités & Agenda canin en 77, 45, 89, 91 — La Voix du Chien" },
      { name: "description", content: "Balades collectives, ateliers à thème et sport canin : découvrez les activités de La Voix du Chien et réservez vos dates sur Rintintin Booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Activités & Agenda — La Voix du Chien" },
      { property: "og:description", content: "Balades, ateliers et sport canin bienveillants. Dates et réservations sur Rintintin Booking." },
    ],
  }),
  component: Agenda,
});

const ACTIVITIES = [
  { icon: Footprints, title: "Balades collectives", desc: "Découvrir de nouveaux environnements, observer et apprendre à mieux vivre ensemble, chiens et humains, à un rythme respectueux." },
  { icon: Lightbulb, title: "Ateliers à thème", desc: "Communication canine, émotions, soins coopératifs : des moments pour mieux comprendre votre chien et adapter votre quotidien." },
  { icon: Trophy, title: "Sport canin complémentaire", desc: "Hoopers, flair, proprioception : des activités ludiques qui renforcent la complicité et l’équilibre de votre chien." },
];

function Agenda() {
  return (
    <>
      <PageHero kicker="Activités & Agenda" title="Vivre de beaux moments avec son chien.">
        Des rencontres bienveillantes, encadrées par des professionnels passionnés. Les dates, lieux, tarifs et places sont publiés et réservables sur Rintintin Booking.
      </PageHero>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6 rounded-3xl border-2 border-accent bg-secondary p-7 md:grid-cols-[auto_1fr] md:items-center md:p-9">
          <HeartHandshake className="h-14 w-14 text-accent" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Première participation ?</p>
            <h2 className="mt-1 text-3xl font-semibold">Faisons connaissance avant de réserver.</h2>
            <p className="mt-3 text-muted-foreground">Vous hésitez sur l’activité adaptée à votre chien ? Répondez à notre questionnaire : il nous aide à préparer un accueil serein pour vous et votre compagnon.</p>
            {ACTIVITY_REQUIREMENTS.behavioralAssessmentRequired && <p className="mt-2 text-sm text-muted-foreground">Un bilan comportemental est demandé avant toute activité ; un bilan réalisé auprès d’un partenaire peut être réutilisé.</p>}
            <Button asChild className="mt-5"><Link to="/contact" search={{ profil: "particulier" }}>Remplir le questionnaire « Faisons connaissance »</Link></Button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ACTIVITIES.map((a) => (
            <article key={a.title} className="flex flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:shadow-lg">
              <a.icon className="h-9 w-9 text-primary" />
              <h2 className="mt-4 text-2xl font-semibold">{a.title}</h2>
              <p className="mt-2 flex-1 text-muted-foreground">{a.desc}</p>
              <a href={RINTINTIN_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-accent hover:underline">Voir les dates & réserver <ExternalLink className="h-4 w-4" /></a>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <CalendarDays className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-3xl font-semibold">L’agenda complet est sur Rintintin Booking</h2>
          <p className="mx-auto mt-3 max-w-2xl opacity-90">Retrouvez toutes les prochaines dates, les lieux, le nombre de places et réservez en quelques clics.</p>
          <Button asChild variant="secondary" size="lg" className="mt-6"><a href={RINTINTIN_URL} target="_blank" rel="noopener noreferrer">Voir les dates & réserver sur Rintintin <ExternalLink /></a></Button>
        </div>
      </section>
    </>
  );
}
