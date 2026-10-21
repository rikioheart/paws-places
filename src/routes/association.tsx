import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Users, Megaphone, ArrowUpRight } from "lucide-react";
import asso from "@/assets/asso.jpg";
import { PageHero } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { AudienceJourneys } from "@/components/AudienceJourneys";
import { GuideDownload } from "@/components/GuideDownload";
import { ASSOCIATION_EMAIL } from "@/lib/data";
import { FOUNDERS } from "@/lib/site-content";
import { MEMBERSHIP_URL } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/association")({
  head: () => ({ meta: pageMeta("L’association, un collectif engagé — La Voix du Chien", "Depuis juillet 2024, La Voix du Chien rassemble familles, bénévoles et professionnels : partage, entraide, activités et collaboration autour du chien.") }),
  component: Association,
});
function Association() {
  return <>
    <PageHero kicker="Notre histoire · depuis le 24 juillet 2024" title="La Voix du Chien, une aventure humaine.">Des familles, des bénévoles et des professionnels, une même volonté : comprendre les chiens et accompagner leurs familles avec respect et coopération.</PageHero>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">Le lien avant la performance.</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">La Voix du Chien est née de la volonté de professionnels du secteur canin de proposer un accompagnement personnalisé aux chiens et à leurs humains. Officiellement créée le 24 juillet 2024, elle place l’éducation positive et la compréhension du comportement au cœur de son engagement.</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Le réseau se construit grâce à l’engagement de ses membres, de ses bénévoles et de ses professionnels. On y partage des conseils, on échange autour de situations complexes et on apprend les uns des autres, pour mieux accompagner chaque famille.</p>
      </div>
      <img src={asso} alt="Illustration d’une rencontre entre une humaine et son chien" width={1200} height={1408} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
    </section>
    <section className="bg-secondary py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-semibold text-accent">À l’origine du collectif</p>
        <h2 className="mt-3 text-4xl font-semibold">Une impulsion fondatrice, une histoire collective.</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">{FOUNDERS.map((f) => <article key={f.name} className="border-t border-primary/20 pt-6">
          <p className="text-sm font-semibold text-accent">{f.focus}</p>
          <h3 className="mt-2 text-xl font-semibold">{f.name}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{f.bio}</p>
        </article>)}</div>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">{[
      { i: Heart, t: "Respecter", d: "Prendre en compte les besoins, les émotions et le rythme de chaque chien." },
      { i: Users, t: "Relier", d: "Créer une communauté d’entraide entre familles et professionnels en 77, 45, 89 et 91." },
      { i: Megaphone, t: "Transmettre", d: "Partager les connaissances et découvrir le langage du chien au fil des ateliers et des échanges." },
    ].map((v) => <div key={v.t}><v.i className="h-8 w-8 text-accent" /><h2 className="mt-3 text-2xl font-semibold">{v.t}</h2><p className="mt-2 text-muted-foreground">{v.d}</p></div>)}</section>
    <AudienceJourneys />
    <section className="mx-auto max-w-6xl px-6 pt-10"><h2 className="text-2xl font-semibold">Échangeons avec l’association</h2><a href={`mailto:${ASSOCIATION_EMAIL}`} className="mt-3 block break-all text-accent underline">{ASSOCIATION_EMAIL}</a></section>
    <section className="mx-auto max-w-6xl px-6 pt-14">
      <h2 className="text-3xl font-semibold">Partir en vacances avec son chien</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">Le guide gratuit de l’association rassemble les préparatifs, documents, indispensables et précautions pour voyager sereinement avec votre compagnon.</p>
      <div className="mt-5"><GuideDownload /></div>
    </section>
  </>;
}
