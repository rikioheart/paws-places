import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Heart, Users, Megaphone } from "lucide-react";
import asso from "@/assets/asso.jpg";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/association")({
  head: () => ({
    meta: [
      { title: "L'association — La Voix du Chien" },
      { name: "description", content: "Découvrez La Voix du Chien, ses valeurs, ses bénévoles et téléchargez le guide gratuit « Partir en vacances avec son chien »." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Qui sommes-nous ? — La Voix du Chien" },
      { property: "og:description", content: "Une association locale et chaleureuse au service des chiens et de leurs humains." },
    ],
  }),
  component: Association,
});

function Association() {
  return (
    <>
      <PageHero kicker="Qui sommes-nous" title="Une association née de l'amour des chiens.">
        Informer, relier, accompagner : nous construisons un réseau local bienveillant autour du chien.
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div className="text-lg leading-relaxed text-muted-foreground">
          <p>La Voix du Chien est née d'un constat simple : trouver un bon éducateur, un pet sitter de confiance ou simplement des compagnons de balade n'est pas toujours facile.</p>
          <p className="mt-4">Nous réunissons propriétaires, bénévoles et professionnels du Sud francilien, du Loiret et de l'Yonne pour partager les bonnes adresses, organiser des sorties et diffuser des conseils utiles.</p>
        </div>
        <img src={asso} alt="Bénévole et son chien" width={1200} height={1408} loading="lazy" className="aspect-square w-full rounded-[2.5rem] object-cover shadow-xl" />
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {[
          { i: Heart, t: "Bienveillance", d: "Des méthodes respectueuses du chien et de son rythme." },
          { i: Users, t: "Communauté", d: "Des balades et rencontres pour créer du lien." },
          { i: Megaphone, t: "Information", d: "Guides et conseils pratiques gratuits." },
        ].map((v) => (
          <div key={v.t} className="rounded-3xl bg-secondary p-7">
            <v.i className="h-8 w-8 text-accent" />
            <h2 className="mt-3 text-2xl font-semibold">{v.t}</h2>
            <p className="mt-1 text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex flex-col items-start gap-6 rounded-[2.5rem] bg-accent p-10 text-accent-foreground md:flex-row md:items-center">
          <span className="animate-floaty text-7xl">📘</span>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold md:text-4xl">Partir en vacances avec son chien</h2>
            <p className="mt-2 opacity-90">Papiers, trousse de voyage, trajet, hébergement : notre guide PDF gratuit pour des vacances sereines.</p>
          </div>
          <a href="/guide-vacances-avec-son-chien.pdf" download className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-4 font-semibold text-foreground"><Download className="h-5 w-5" /> Télécharger gratuitement</a>
        </div>
        <p className="mt-8 text-center"><Link to="/contact" className="font-semibold text-accent underline">Envie de nous rejoindre comme bénévole ? Écrivez-nous</Link></p>
      </section>
    </>
  );
}
