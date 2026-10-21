import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: pageMeta("Accompagnements & réseau canin 77, 45, 89, 91 — La Voix du Chien", "Les activités collectives de l’association et les prestations individuelles des professionnels du réseau en Seine-et-Marne, Loiret, Yonne et Essonne.") }),
  component: Services,
});
function Services() {
  return <>
    <PageHero kicker="Accompagnements & activités" title="Tout un univers à découvrir avec votre chien.">Avoir un chien, ce n’est pas seulement l’éduquer. C’est apprendre à le comprendre, partager des expériences et construire une relation qui respecte chacun.</PageHero>
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-12 border-l-4 border-accent bg-secondary px-6 py-6">
        <h2 className="text-2xl font-semibold">Des rôles complémentaires, un même engagement.</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">L’association crée des balades collectives, des ateliers à thème, des initiations et des événements pédagogiques. Les bilans comportementaux, l’éducation et la rééducation sont assurés par les professionnels indépendants du réseau, pas par l’association.</p>
        <Button asChild className="mt-5"><Link to="/agenda">Découvrir les activités de l’association</Link></Button>
      </div>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{SERVICES.map((s, i) => <div key={s.title} className="border-t py-6"><p className="text-sm font-semibold text-accent">0{i+1}</p><h2 className="mt-3 text-2xl font-semibold">{s.title}</h2><p className="mt-3 text-muted-foreground">{s.desc}</p></div>)}</div>
      <div className="mt-10 flex flex-wrap gap-4"><Button asChild><Link to="/annuaire">Trouver un professionnel <ArrowRight /></Link></Button><Button asChild variant="outline"><Link to="/agenda">Rencontrer la communauté</Link></Button></div>
    </section>
  </>;
}