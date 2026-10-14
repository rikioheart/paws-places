export type Category = "educ" | "photo" | "bien" | "sit" | "secours";

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  educ: { label: "Éducateurs", emoji: "🎓", color: "var(--cat-educ)" },
  photo: { label: "Photographes", emoji: "📸", color: "var(--cat-photo)" },
  bien: { label: "Bien-être", emoji: "🌿", color: "var(--cat-bien)" },
  sit: { label: "Pet sitting", emoji: "🏡", color: "var(--cat-sit)" },
  secours: { label: "Secours", emoji: "🚑", color: "var(--cat-secours)" },
};

export type Pro = {
  id: string;
  name: string;
  category: Category;
  city: string;
  dept: "77" | "45" | "89" | "91" | "Limitrophe";
  lat: number;
  lng: number;
  zone: string;
  hours: string;
  phone: string;
  email: string;
  description: string;
};

// Exemples de fiches — à remplacer par les vrais professionnels partenaires.
export const PROS: Pro[] = [
  { id: "p1", name: "Canin'Éduc Fontainebleau", category: "educ", city: "Fontainebleau", dept: "77", lat: 48.404, lng: 2.701, zone: "30 km autour de Fontainebleau", hours: "Lun–Sam · 9h–19h", phone: "06 00 00 00 01", email: "contact@exemple.fr", description: "Éducation bienveillante, chiots et chiens réactifs, cours à domicile." },
  { id: "p2", name: "Melun Dog Coach", category: "educ", city: "Melun", dept: "77", lat: 48.54, lng: 2.66, zone: "Melun Val de Seine", hours: "Mar–Dim · 10h–18h", phone: "06 00 00 00 02", email: "contact@exemple.fr", description: "Séances individuelles et cours collectifs en extérieur." },
  { id: "p3", name: "Studio Truffe", category: "photo", city: "Nemours", dept: "77", lat: 48.267, lng: 2.697, zone: "77, 45, 89", hours: "Sur rendez-vous", phone: "06 00 00 00 03", email: "contact@exemple.fr", description: "Séances photo en pleine nature avec votre compagnon." },
  { id: "p4", name: "Patte & Lumière", category: "photo", city: "Évry-Courcouronnes", dept: "91", lat: 48.63, lng: 2.44, zone: "Essonne et sud francilien", hours: "Week-ends", phone: "06 00 00 00 04", email: "contact@exemple.fr", description: "Portraits lifestyle et reportages de balades." },
  { id: "p5", name: "Ostéo Canin Loiret", category: "bien", city: "Montargis", dept: "45", lat: 47.998, lng: 2.733, zone: "Montargis + 40 km", hours: "Lun–Ven · 8h30–18h", phone: "06 00 00 00 05", email: "contact@exemple.fr", description: "Ostéopathie animale, suivi des chiens sportifs et seniors." },
  { id: "p6", name: "Zen Toutou", category: "bien", city: "Sens", dept: "89", lat: 48.197, lng: 3.283, zone: "Sénonais", hours: "Mer–Sam · 9h–17h", phone: "06 00 00 00 06", email: "contact@exemple.fr", description: "Massages, réflexologie et toilettage doux." },
  { id: "p7", name: "Les Pattes du Gâtinais", category: "sit", city: "Pithiviers", dept: "45", lat: 48.172, lng: 2.252, zone: "Gâtinais", hours: "7j/7", phone: "06 00 00 00 07", email: "contact@exemple.fr", description: "Garde à domicile, visites et promenades." },
  { id: "p8", name: "Dog Sitter Étampes", category: "sit", city: "Étampes", dept: "91", lat: 48.434, lng: 2.161, zone: "Sud Essonne", hours: "7j/7 · 7h–21h", phone: "06 00 00 00 08", email: "contact@exemple.fr", description: "Pension familiale et garde ponctuelle." },
  { id: "p9", name: "Joigny Animaux Secours", category: "secours", city: "Joigny", dept: "89", lat: 47.982, lng: 3.397, zone: "Nord Yonne", hours: "24h/24 urgences", phone: "06 00 00 00 09", email: "contact@exemple.fr", description: "Formation premiers secours canins et transport d'urgence." },
  { id: "p10", name: "SOS Chiens Perdus 77", category: "secours", city: "Provins", dept: "77", lat: 48.56, lng: 3.299, zone: "Est Seine-et-Marne", hours: "7j/7", phone: "06 00 00 00 10", email: "contact@exemple.fr", description: "Recherche de chiens perdus et réseau de bénévoles." },
  { id: "p11", name: "Éduc'Auxerre", category: "educ", city: "Auxerre", dept: "89", lat: 47.798, lng: 3.567, zone: "Auxerrois", hours: "Lun–Sam · 9h–19h", phone: "06 00 00 00 11", email: "contact@exemple.fr", description: "Méthodes positives, préparation au CSAU." },
  { id: "p12", name: "Balades & Câlins Nogent", category: "sit", city: "Nogent-sur-Seine", dept: "Limitrophe", lat: 48.494, lng: 3.502, zone: "Aube nord", hours: "Lun–Ven", phone: "06 00 00 00 12", email: "contact@exemple.fr", description: "Promenades individuelles et en petits groupes." },
];

export const PARTNERS = [
  { name: "Croquettes Bio du Terroir", type: "Alimentation", desc: "Croquettes françaises sans céréales, fabriquées en circuit court.", code: "VOIX10", perk: "-10 % sur la 1re commande" },
  { name: "Harnais Atelier", type: "Accessoires", desc: "Harnais et laisses cousus main en matériaux recyclés.", code: "LVC15", perk: "-15 % sur tout le site" },
  { name: "Le Panier Vert", type: "Couchage", desc: "Paniers en coton bio et garnissage déperlant.", code: "CHIENHEUREUX", perk: "Livraison offerte" },
  { name: "Friandises Maison", type: "Friandises", desc: "Biscuits artisanaux 100 % naturels.", code: "LAVOIX5", perk: "5 € offerts dès 30 €" },
  { name: "Éco Toutou", type: "Hygiène", desc: "Shampoings solides et sacs compostables.", code: "LVC-ECO", perk: "-12 %" },
  { name: "Jouets Éthiques", type: "Jeux", desc: "Jouets en caoutchouc naturel et chanvre.", code: "JOUELVC", perk: "1 jouet offert" },
];

export type WalkEvent = { id: string; title: string; date: string; time: string; place: string; dept: string; kind: string; level: string; spots: number; desc: string };

export const EVENTS: WalkEvent[] = [
  { id: "e1", title: "Balade en forêt de Fontainebleau", date: "2026-10-25", time: "10h00", place: "Carrefour de l'Obélisque, Fontainebleau", dept: "77", kind: "Balade collective", level: "Facile · 6 km", spots: 15, desc: "Une boucle au milieu des rochers, idéale pour socialiser en douceur." },
  { id: "e2", title: "Atelier rappel & jeux", date: "2026-11-08", time: "14h30", place: "Parc de Montargis", dept: "45", kind: "Activité", level: "Tous niveaux", spots: 10, desc: "Atelier ludique animé par un éducateur partenaire." },
  { id: "e3", title: "Rando des bords de l'Yonne", date: "2026-11-22", time: "09h30", place: "Quai de Joigny", dept: "89", kind: "Balade collective", level: "Moyen · 10 km", spots: 20, desc: "Randonnée le long de l'eau, pique-nique tiré du sac." },
  { id: "e4", title: "Initiation premiers secours canins", date: "2026-12-06", time: "10h00", place: "Salle des fêtes, Étampes", dept: "91", kind: "Formation", level: "Adultes", spots: 12, desc: "Les bons gestes en cas d'urgence : étouffement, coup de chaleur, plaie." },
  { id: "e5", title: "Balade de Noël en Gâtinais", date: "2026-12-20", time: "14h00", place: "Château-Landon", dept: "77", kind: "Balade collective", level: "Facile · 5 km", spots: 25, desc: "Balade festive suivie d'un vin chaud (et de biscuits pour les chiens)." },
];
