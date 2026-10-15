import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/articles";
import { ARTICLE_IMAGES } from "@/lib/site-content";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const article = ARTICLES.find((a) => a.slug === params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData, params }) => ({
    meta: pageMeta(`${loaderData?.title ?? "Article"} — La Voix du Chien`, loaderData?.excerpt ?? "Le journal de La Voix du Chien", "article"),
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, datePublished: loaderData.date,
      author: { "@type": "Organization", name: "La Voix du Chien" },
      publisher: { "@type": "Organization", name: "La Voix du Chien" },
      description: loaderData.excerpt, inLanguage: "fr", isBasedOn: loaderData.source,
    }) }] : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  const image = a.imageIndex !== null ? ARTICLE_IMAGES[a.imageIndex] : undefined;
  return <article className="mx-auto max-w-4xl px-6 pb-10 pt-32">
    <Link to="/blog" className="text-sm font-semibold text-accent">← Le journal</Link>
    <p className="mt-8 text-sm text-muted-foreground">La Voix du Chien · {new Date(`${a.date}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
    <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">{a.title}</h1>
    {image && <img src={image} alt={a.title} className="mt-8 max-h-[480px] w-full rounded-lg object-contain" />}
    <div className="mx-auto mt-10 max-w-3xl space-y-6 text-lg leading-relaxed">
      {a.blocks.map((b, i) => b.kind === "heading" ? <h2 key={i} className="pt-5 text-2xl font-semibold">{b.text}</h2> : b.kind === "quote" ? <blockquote key={i} className="border-l-4 border-accent pl-5 italic">{b.text}</blockquote> : <p key={i} className="text-muted-foreground">{b.text}</p>)}
    </div>
    <div className="mt-12 border-t pt-8">
      <p className="text-sm text-muted-foreground">Texte publié par La Voix du Chien le {new Date(`${a.date}T12:00:00`).toLocaleDateString("fr-FR")}.</p>
      <h2 className="mt-5 text-3xl">Et si nous en parlions ensemble ?</h2>
      <p className="mt-3 text-muted-foreground">Votre chien, vos questions, votre expérience : notre communauté se construit aussi avec vous.</p>
      <Button asChild className="mt-5"><Link to="/contact">Échanger avec l’association</Link></Button>
    </div>
  </article>;
}