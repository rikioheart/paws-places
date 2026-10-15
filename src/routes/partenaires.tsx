import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { PARTNERS } from "@/lib/data";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires & boutiques éthiques — La Voix du Chien" },
      { name: "description", content: "Nos boutiques partenaires éthiques et leurs codes promo exclusifs pour les membres de La Voix du Chien." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Partenaires & codes promo — La Voix du Chien" },
      { property: "og:description", content: "Alimentation, accessoires, jeux : des marques éthiques et des réductions exclusives." },
    ],
  }),
  component: Partenaires,
});

function Partenaires() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(code);
    toast.success(`Code ${code} copié !`);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <>
      <PageHero kicker="Espace partenaires" title="Des boutiques éthiques, des codes rien que pour vous.">
        Chaque achat chez nos partenaires soutient les actions de l'association.
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p, i) => (
          <article key={p.name} className="group relative flex flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}>
            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{p.type}</span>
            <h2 className="mt-4 text-2xl font-semibold">{p.name}</h2>
            <p className="mt-2 flex-1 text-muted-foreground">{p.desc}</p>
            <p className="mt-4 font-semibold text-accent">{p.perk}</p>
            <button onClick={() => copy(p.code)} className="mt-3 flex items-center justify-between rounded-2xl border-2 border-dashed border-accent bg-accent/10 px-4 py-3 font-mono text-lg font-bold transition hover:bg-accent hover:text-accent-foreground">
              {p.code}
              {copied === p.code ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </article>
        ))}
      </section>
      <p className="mx-auto max-w-6xl px-6 text-center text-muted-foreground">Vous êtes une marque éthique ? <a href="/contact" className="font-semibold text-accent underline">Devenez partenaire</a>.</p>
    </>
  );
}
