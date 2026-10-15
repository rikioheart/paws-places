import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/lib/articles";
import { ARTICLE_IMAGES } from "@/lib/site-content";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/SiteChrome";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: pageMeta("Conseils & récits autour du chien — La Voix du Chien", "Éducation bienveillante, émotions, santé et relation humain-chien : retrouvez les articles et projets de l’association La Voix du Chien.") }),
  component: Blog,
});

function Blog() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/blog" && pathname !== "/blog/") return <Outlet />;
  return <>
    <PageHero kicker="Le journal" title="Mieux comprendre son chien, un récit à la fois.">Des regards, des connaissances et des projets pour faire grandir la relation entre humains et chiens.</PageHero>
    <section className="mx-auto grid max-w-6xl gap-x-8 gap-y-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-3">
      {ARTICLES.map((a) => <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group block min-w-0">
        {a.imageIndex !== null && ARTICLE_IMAGES[a.imageIndex] ? <img src={ARTICLE_IMAGES[a.imageIndex]} alt={a.title} loading="lazy" className="aspect-[16/10] w-full rounded-lg object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center rounded-lg bg-secondary p-8 font-display text-3xl text-primary">Le journal de La Voix du Chien</div>}
        <p className="mt-5 text-sm text-muted-foreground">{new Date(`${a.date}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
        <h2 className="mt-2 text-2xl font-semibold group-hover:text-accent">{a.title}</h2>
        <p className="mt-3 line-clamp-3 text-muted-foreground">{a.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-semibold text-accent">Lire l’article <ArrowUpRight className="h-4 w-4" /></span>
      </Link>)}
    </section>
  </>;
}