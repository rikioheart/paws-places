import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "@/components/SiteChrome";
import { FirstContactForm } from "@/components/FirstContactForm";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ profil: z.enum(["particulier", "professionnel"]).optional() }),
  head: () => ({
    meta: [
      { title: "Contact & Faisons connaissance — La Voix du Chien" },
      { name: "description", content: "Particulier ou professionnel du chien en 77, 45, 89 et 91 : présentez-vous et votre chien à l’association La Voix du Chien." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Faisons connaissance — La Voix du Chien" },
      { property: "og:description", content: "Un questionnaire adapté aux particuliers et aux professionnels du chien." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { profil } = Route.useSearch();
  return (
    <>
      <PageHero kicker="Faisons connaissance" title="Parlons de vous et de votre chien.">
        Particulier ou professionnel, choisissez votre profil : nous vous posons uniquement les questions utiles pour bien vous accompagner.
      </PageHero>
      <section className="mx-auto max-w-3xl px-6 py-12">
        <FirstContactForm key={profil ?? "particulier"} initial={profil ?? "particulier"} />
      </section>
    </>
  );
}
