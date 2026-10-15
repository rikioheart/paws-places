import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Users, Megaphone, ArrowUpRight } from "lucide-react";
import asso from "@/assets/asso.jpg";
import { PageHero } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { FOUNDERS } from "@/lib/site-content";
import { MEMBERSHIP_URL } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/association")({
  head: () => ({ meta: pageMeta("L’association & ses fondateurs — La Voix du Chien", "Fondée le 24 juillet 2024 par Océane Ripoll, Marie Berrier et Aurélien Ragot, La Voix du Chien rassemble familles et professionnels autour de l’éducation positive.") }),
  component: Association,
});
function Association() {
  return <>
    <PageHero kicker="Notre histoire · depuis le 24 juillet 2024" title="La Voix du Chien, une aventure humaine.">Trois éducateurs, des parcours différents, une même volonté : comprendre les chiens et accompagner leurs familles avec respect et coopération.</PageHero>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">Le lien avant la performance.</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">La Voix du Chien est née de la volonté de professionnels du secteur canin de proposer un accompagnement personnalisé aux chiens et à leurs humains. Officiellement créée le 24 juillet 2024, elle place l’éducation positive et la compréhension du comportement au cœur de son engagement.</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Océane Ripoll, Marie Berrier et Aurélien Ragot ont réuni leurs expériences pour construire un réseau solidaire. On y partage des conseils, on échange autour de situations complexes et on apprend les uns des autres, pour mieux accompagner chaque famille.</p>
      </div>
      <img src={asso} alt="Illustration d’une rencontre entre une humaine et son chien" width={1200} height={1408} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
    </section>
    <section className="bg-secondary py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-semibold text-accent">Les membres fondateurs</p>
        <h2 className="mt-3 text-4xl font-semibold">Trois chemins, une conviction commune.</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">{FOUNDERS.map((f) => <article key={f.name} className="border-t border-primary/20 pt-6">
          <p className="text-sm font-semibold text-accent">{f.focus}</p>
          <h3 className="mt-2 text-3xl font-semibold">{f.name}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{f.bio}</p>
          <a href={`mailto:${f.email}`} className="mt-5 block break-all text-sm font-semibold text-primary underline">{f.email}</a>
          <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-primary">{f.phone}</a>
        </article>)}</div>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">{[
      { i: Heart, t: "Respecter", d: "Prendre en compte les besoins, les émotions et le rythme de chaque chien." },
      { i: Users, t: "Relier", d: "Créer une communauté d’entraide entre familles et professionnels en 77, 45, 89 et 91." },
      { i: Megaphone, t: "Transmettre", d: "Partager les connaissances et découvrir le langage du chien au fil des ateliers et des échanges." },
    ].map((v) => <div key={v.t}><v.i className="h-8 w-8 text-accent" /><h2 className="mt-3 text-2xl font-semibold">{v.t}</h2><p className="mt-2 text-muted-foreground">{v.d}</p></div>)}</section>
    <section className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-semibold">Et vous, quelle sera votre place ?</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div><h3 className="text-2xl">Vous vivez avec un chien</h3><p className="mt-3 opacity-90">Parlez-nous de vos besoins. Nous vous orienterons vers un professionnel adapté et vous présenterons les ateliers et rencontres de l’association.</p><Button asChild variant="secondary" className="mt-5"><Link to="/contact">Faire connaissance</Link></Button></div>
          <div><h3 className="text-2xl">Vous êtes professionnel</h3><p className="mt-3 opacity-90">Rejoignez un réseau où partager votre expérience, échanger sur votre pratique et accompagner des familles dans un esprit de collaboration.</p><Button asChild variant="secondary" className="mt-5"><Link to="/contact">Rejoindre le réseau</Link></Button></div>
        </div>
        <a href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 font-semibold text-sun underline">Soutenir l’association et adhérer sur HelloAsso <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pt-14">
      <h2 className="text-3xl font-semibold">Partir en vacances avec son chien</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">Le guide gratuit de l’association rassemble les préparatifs, documents, indispensables et précautions pour voyager sereinement avec votre compagnon.</p>
      <Button asChild className="mt-5"><Link to="/contact">Demander le guide gratuit</Link></Button>
    </section>
  </>;
}
