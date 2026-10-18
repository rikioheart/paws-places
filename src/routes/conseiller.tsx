import { createFileRoute } from "@tanstack/react-router";
import { DogAdvisor } from "@/components/DogAdvisor";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/conseiller")({
  head: () => ({ meta: pageMeta("Conseiller canin IA — La Voix du Chien", "Décrivez les besoins de votre chien et trouvez les services, activités et articles pertinents de La Voix du Chien."), links: [{ rel: "canonical", href: "/conseiller" }] }),
  component: DogAdvisor,
});