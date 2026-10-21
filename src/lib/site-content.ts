import article0 from "@/assets/article-0.jpg.asset.json";
import article1 from "@/assets/article-1.jpg.asset.json";
import article2 from "@/assets/article-2.jpg.asset.json";
import article3 from "@/assets/article-3.jpg.asset.json";
import article5 from "@/assets/article-5.jpg.asset.json";

export const ARTICLE_IMAGES: Record<number, string> = { 0: article0.url, 1: article1.url, 2: article2.url, 3: article3.url, 5: article5.url };
export const FOUNDERS = [
  { name: "Océane Ripoll", focus: "Éducation & émotions", bio: "Éducatrice canine depuis 2017, Océane accompagne les émotions et la modification des comportements. Ses échanges avec éducateurs, vétérinaires, éleveurs et toiletteurs nourrissent une approche attentive au chien comme à son humain." },
  { name: "Marie Berrier", focus: "Compréhension & coopération", bio: "Après une licence de psychologie et l’ACACED, Marie se forme à l’éducation positive auprès d’Océane depuis septembre 2021. Sa conviction : continuer à apprendre pour aider chaque duo à vivre dans le respect et le bien-être." },
  { name: "Aurélien Ragot", focus: "Refuge & sports canins", bio: "La réhabilitation des chiens de refuge, de 2020 à fin 2023, a façonné son engagement. Aurélien s’est ensuite tourné vers le nosework, la proprioception et le dog parkour pour aider les chiens à exprimer leurs capacités et à s’épanouir." },
];
export const SERVICES = [
  { title: "Bilan comportemental", desc: "Réalisé par un professionnel indépendant du réseau : comprendre les besoins de votre chien et proposer un accompagnement individuel." },
  { title: "Éducation & rééducation", desc: "Des prestations proposées par les professionnels indépendants de l’annuaire, pour une communication plus claire et un accompagnement personnalisé." },
  { title: "Balades collectives", desc: "Découvrir de nouveaux environnements, partager un moment et mieux observer les interactions entre chiens." },
  { title: "Ateliers à thème", desc: "Communication canine, gestion des émotions et soins coopératifs : approfondir ses connaissances avec des professionnels passionnés." },
  { title: "Sports & activités de flair", desc: "Hoopers, activités de flair et proprioception stimulent le corps et l’esprit tout en renforçant la complicité." },
  { title: "Un réseau complémentaire", desc: "Pet sitting, photographie, bien-être et premiers secours : des professionnels aux expertises variées autour de votre compagnon." },
];