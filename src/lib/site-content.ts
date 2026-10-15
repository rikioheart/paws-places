import article0 from "@/assets/article-0.jpg.asset.json";
import article1 from "@/assets/article-1.jpg.asset.json";
import article2 from "@/assets/article-2.jpg.asset.json";
import article3 from "@/assets/article-3.jpg.asset.json";
import article5 from "@/assets/article-5.jpg.asset.json";

export const ARTICLE_IMAGES: Record<number, string> = { 0: article0.url, 1: article1.url, 2: article2.url, 3: article3.url, 5: article5.url };
export const FOUNDERS = [
  { name: "Océane Ripoll", focus: "Éducation & émotions", bio: "Éducatrice canine depuis 2017, Océane accompagne les émotions et la modification des comportements. Ses échanges avec éducateurs, vétérinaires, éleveurs et toiletteurs nourrissent une approche attentive au chien comme à son humain.", phone: "06 26 39 58 03", email: "educdor@gmail.com" },
  { name: "Marie Berrier", focus: "Compréhension & coopération", bio: "Après une licence de psychologie et l’ACACED, Marie se forme à l’éducation positive auprès d’Océane depuis septembre 2021. Sa conviction : continuer à apprendre pour aider chaque duo à vivre dans le respect et le bien-être.", phone: "06 13 60 12 96", email: "souriredechien@gmail.com" },
  { name: "Aurélien Ragot", focus: "Refuge & sports canins", bio: "La réhabilitation des chiens de refuge, de 2020 à fin 2023, a façonné son engagement. Aurélien s’est ensuite tourné vers le nosework, la proprioception et le dog parkour pour aider les chiens à exprimer leurs capacités et à s’épanouir.", phone: "06 68 85 17 20", email: "ragot.delille@gmail.com" },
];
export const SERVICES = [
  { title: "Bilan comportemental", desc: "Un premier échange pour comprendre le tempérament, les émotions et les besoins de votre chien, puis construire un accompagnement adapté." },
  { title: "Éducation & rééducation", desc: "Une communication plus claire au quotidien et un accompagnement personnalisé des comportements difficiles, dans le respect du duo chien-humain." },
  { title: "Balades collectives", desc: "Découvrir de nouveaux environnements, partager un moment et mieux observer les interactions entre chiens." },
  { title: "Ateliers à thème", desc: "Communication canine, gestion des émotions et soins coopératifs : approfondir ses connaissances avec des professionnels passionnés." },
  { title: "Sports & activités de flair", desc: "Hoopers, activités de flair et proprioception stimulent le corps et l’esprit tout en renforçant la complicité." },
  { title: "Un réseau complémentaire", desc: "Pet sitting, photographie, bien-être et premiers secours : des professionnels aux expertises variées autour de votre compagnon." },
];