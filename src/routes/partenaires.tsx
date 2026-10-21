import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { PARTNERS } from "@/lib/data";
import { PageHero } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/partenaires")({
  head: () => ({ meta: pageMeta("Partenaires & codes promo officiels — La Voix du Chien", "Découvrez Cernunos, Flair’Rita, Cynopod, Patte Saine, VIK & CO, Sublimypaws et Healthy Paw’s, les boutiques partenaires de La Voix du Chien.") }),
  component: Partenaires,
});
function Partenaires() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); setCopied(code); toast.success(`Code ${code} copié !`); setTimeout(() => setCopied(null), 2000); }
    catch { toast.error("La copie n’est pas disponible. Vous pouvez sélectionner le code."); }
  };
  return <>
    <PageHero kicker="Nos partenaires commerciaux" title="Des partenaires engagés, un lien qui nous rassemble.">Mastication, jeux, accessoires ou créations artisanales : découvrez les boutiques présentées par l’association et leurs avantages publiés. Ici, les boutiques et marques ; dans l’annuaire, les professionnels qui accompagnent votre chien.</PageHero>
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {PARTNERS.map((p) => <article key={p.name} className="flex min-w-0 flex-col rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase text-accent">{p.type}</p>
        <h2 className="mt-4 text-3xl font-semibold">{p.name}</h2>
        <p className="mt-3 flex-1 text-muted-foreground">{p.desc}</p>
        <p className="mt-5 font-semibold text-primary">{p.perk}</p>
        {p.code && <Button variant="outline" onClick={() => copy(p.code ?? "")} aria-label={`Copier le code ${p.code}`} className="mt-3 h-12 justify-between border-dashed font-mono text-lg">{p.code}{copied === p.code ? <Check /> : <Copy />}</Button>}
        {p.conditions && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.conditions}</p>}
        {p.email && <a href={`mailto:${p.email}`} className="mt-3 break-all text-sm text-accent underline">{p.email}</a>}
        <Button asChild variant="link" className="mt-5 justify-start px-0"><a href={p.website} target="_blank" rel="noopener noreferrer">{p.website.includes("instagram.com") ? "Retrouver sur Instagram" : "Visiter le site internet"}<ArrowUpRight /></a></Button>
        {p.socials?.map(link => <Button asChild variant="link" key={link.url} className="justify-start px-0"><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight /></a></Button>)}
      </article>)}
    </section>
    <section className="mx-auto max-w-6xl border-t px-6 pt-10">
      <h2 className="text-3xl font-semibold">Faisons grandir le réseau ensemble.</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">Professionnels, créateurs, boutiques ou associations : partageons nos objectifs et construisons des collaborations autour du bien-être des chiens.</p>
      <Button asChild className="mt-5"><Link to="/contact" search={{ profil: "professionnel" }}>Proposer un partenariat</Link></Button>
    </section>
  </>;
}
