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
  lat?: number;
  lng?: number;
  zone: string;
  hours: string;
  phone?: string;
  email?: string;
  description: string;
  website: string;
  socials?: { label: string; url: string }[];
};

// Imported from the official WordPress partners page; map coordinates mark towns, not business addresses.
export const PROS: Pro[] = [
  {
    "name": "Dog’s World Éducation Canine",
    "category": "educ",
    "city": "Nemours",
    "dept": "77",
    "lat": 48.267,
    "lng": 2.697,
    "zone": "45 minutes autour de Nemours",
    "hours": "9h–18h30 · fermé mercredi et dimanche",
    "description": "Élodie accompagne les chiots et chiens adultes : rééducation, cours individuels et collectifs, balades et jeux libres sur terrain.",
    "website": "https://www.dogsworldeducationcanine.fr/",
    "id": "pro-1"
  },
  {
    "name": "Le Secret du Chien",
    "category": "educ",
    "city": "Fontainebleau",
    "dept": "77",
    "lat": 48.404,
    "lng": 2.701,
    "zone": "Fontainebleau et alentours",
    "hours": "Lun–Sam 9h–17h · Dim 10h–16h",
    "description": "Mélanie propose éducation des chiots et chiens, balades individuelles et collectives, conseils et suivi.",
    "website": "https://lesecretduchien.com/",
    "id": "pro-2"
  },
  {
    "name": "Harmonymals",
    "category": "educ",
    "city": "Villeneuve-la-Guyard",
    "dept": "89",
    "lat": 48.34,
    "lng": 3.066,
    "zone": "20 km autour de Villeneuve-la-Guyard ; déplacement au-delà à convenir",
    "hours": "Lun, Mer, Ven, Sam, Dim 9h–18h · Mar, Jeu 9h–12h30",
    "description": "Véronique : comportement, nutrition chien et chat, éducation, sports canins, balades et Fleurs de Bach.",
    "website": "https://www.harmonymals.fr/",
    "id": "pro-3"
  },
  {
    "name": "Canimalis",
    "category": "educ",
    "city": "Merry-la-Vallée",
    "dept": "89",
    "lat": 47.8,
    "lng": 3.35,
    "zone": "Toucy–Auxerre ; contacter Camille au-delà de 35 km de Merry-la-Vallée",
    "hours": "Lun–Ven 9h–19h30 · Sam 8h30–12h30",
    "description": "Éducation canine, canikayak, canipaddle, canirandos, canivacances, pet sitting et prévention des morsures.",
    "website": "https://canimalis.fr/",
    "id": "pro-4"
  },
  {
    "name": "Wolfys.stars",
    "category": "photo",
    "city": "Centre-Val de Loire et Île-de-France",
    "dept": "Limitrophe",
    "zone": "Centre-Val de Loire et Île-de-France",
    "hours": "Sur demande",
    "description": "Maureen est photographe d’animaux de compagnie atypiques.",
    "website": "https://linktr.ee/wolfys.stars",
    "id": "pro-5"
  },
  {
    "name": "Sans-laisse Éducation Canine",
    "category": "educ",
    "city": "Villecresnes",
    "dept": "Limitrophe",
    "lat": 48.72,
    "lng": 2.53,
    "zone": "Villecresnes, Paris, Seine-et-Marne, Essonne et Val-de-Marne",
    "hours": "Lun–Sam 9h–18h · fermé dimanche",
    "description": "Promenades en bois et forêt, carnet d’éducation, pet sitting et balades éducatives.",
    "website": "https://www.sans-laisse.fr/",
    "id": "pro-6"
  },
  {
    "name": "En Bonne Compagnie",
    "category": "sit",
    "city": "Villemandeur",
    "dept": "45",
    "lat": 48,
    "lng": 2.706,
    "zone": "Villemandeur",
    "hours": "Lun–Ven 8h–19h · fermé le week-end",
    "description": "Visites à domicile, pet sitting et balades canines.",
    "website": "https://enbonnecompagnieco.wixsite.com/en-bonne-compagnie",
    "id": "pro-7"
  },
  {
    "name": "Manon — Réflexologie & Massages Canins",
    "category": "bien",
    "city": "Haute-Normandie et Île-de-France",
    "dept": "Limitrophe",
    "zone": "Haute-Normandie et Île-de-France",
    "hours": "Lun–Ven 9h–19h · Sam–Dim 9h–17h",
    "description": "Réflexologie, massages et suivi sportif : bien-être, mobilité et performances.",
    "website": "https://www.manon-massagescanins.com/",
    "id": "pro-8"
  },
  {
    "name": "Sincérité Animale",
    "category": "educ",
    "city": "Gagny",
    "dept": "Limitrophe",
    "lat": 48.884,
    "lng": 2.535,
    "zone": "Secteur de Gagny",
    "hours": "Lun–Dim 9h–20h",
    "description": "Bilans comportementaux chiens et chats, éducation et rééducation, visites, promenades, pré-adoption et balades sociales.",
    "website": "https://www.sinceriteanimale.fr/blank",
    "id": "pro-9"
  },
  {
    "name": "Pensées de Chiens",
    "category": "educ",
    "city": "Orléans",
    "dept": "45",
    "lat": 47.903,
    "lng": 1.909,
    "zone": "Secteur d’Orléans",
    "hours": "Mar–Sam 8h–19h",
    "description": "Bilan comportemental, éducation chiot et chien adulte, cours collectifs et Treibball.",
    "website": "https://penseesdechiens.my.canva.site/",
    "id": "pro-10"
  },
  {
    "name": "Truff’ and Co",
    "category": "sit",
    "city": "Auxerre",
    "dept": "89",
    "lat": 47.798,
    "lng": 3.567,
    "zone": "Auxerre et alentours",
    "hours": "Lun 14h–18h · Mar–Sam 9h–18h",
    "description": "Bilan comportemental, éducation individuelle, balades collectives éducatives et pet sitting chiens, chats et NAC.",
    "website": "https://truff-and-co.fr/",
    "id": "pro-11"
  },
  {
    "name": "Soleil Canin",
    "category": "educ",
    "city": "Essonne",
    "dept": "91",
    "zone": "Essonne et départements limitrophes",
    "hours": "Lun–Dim 10h–19h",
    "description": "Éducation et émotions : bilan, visio pré-adoption, rééducation, activités collectives, transport animalier et premiers secours.",
    "website": "https://www.instagram.com/soleilcanin",
    "id": "pro-12"
  },
  {
    "name": "Valérie Cantaloube",
    "category": "bien",
    "city": "Accompagnement humain-animal",
    "dept": "Limitrophe",
    "zone": "Lieu et modalités à convenir",
    "hours": "Lun, Mer–Sam 9h30–19h30",
    "description": "Psychopraticienne et comportementaliste chien-chat, spécialisée dans la régulation du stress et des émotions chez l’humain et l’animal.",
    "website": "https://www.valeriecantaloube.com/",
    "id": "pro-13",
    "email": "contact@valeriecantaloube.com"
  },
  {
    "name": "Shaaton Photography",
    "category": "photo",
    "city": "Lieu à convenir",
    "dept": "Limitrophe",
    "zone": "Secteur à confirmer auprès de la photographe",
    "hours": "Lun–Ven 9h–17h",
    "description": "Séances photo autour du lien humain-animal, dans le respect du rythme de chaque compagnon.",
    "website": "https://shaatoonphotography.mypixieset.com/",
    "id": "pro-14",
    "email": "shaaton@hotmail.com"
  },
  {
    "name": "Wonder Woof",
    "category": "educ",
    "city": "Avallon",
    "dept": "89",
    "lat": 47.49,
    "lng": 3.91,
    "zone": "Morvan et Bourgogne · séances en visio partout en France",
    "hours": "Sur demande",
    "description": "Salomé accompagne chiots, chiens adoptés, sensibles, anxieux ou réactifs, avec une pédagogie progressive et sans contrainte.",
    "website": "https://wonder-woof.fr/",
    "id": "pro-15",
    "email": "wonderwoof24@gmail.com"
  },
  {
    "name": "KarineBL Photographie",
    "category": "photo",
    "city": "Loiret",
    "dept": "45",
    "zone": "Loiret et départements limitrophes",
    "hours": "Sur demande",
    "description": "Photographie animalière et du lien humain-animal : des souvenirs spontanés et authentiques.",
    "website": "https://www.karinebl-photographie.fr/",
    "id": "pro-16"
  },
  {
    "name": "Cynozou",
    "category": "educ",
    "city": "Bachivillers",
    "dept": "Limitrophe",
    "lat": 49.29,
    "lng": 1.97,
    "zone": "50 km autour de Bachivillers : Oise, Val-d’Oise, Yvelines, Eure",
    "hours": "Sur demande",
    "description": "Maëliss : éducation et comportement canin, médiation animale, zoothérapie, équithérapie et hortithérapie.",
    "website": "https://cynozou.com/",
    "id": "pro-17"
  },
  {
    "name": "Le Trèfle des Pattounes",
    "category": "sit",
    "city": "Sceaux-du-Gâtinais",
    "dept": "45",
    "lat": 48.105,
    "lng": 2.597,
    "zone": "Loiret et Seine-et-Marne",
    "hours": "Sur demande",
    "description": "Lydie Canault propose du pet sitting à domicile en préservant les habitudes et l’environnement de l’animal.",
    "website": "https://petsitting-mediation-animale.com/",
    "id": "pro-18"
  },
  {
    "name": "Patrouille au Poil",
    "category": "secours",
    "city": "Souppes-sur-Loing",
    "dept": "77",
    "lat": 48.18,
    "lng": 2.735,
    "zone": "Souppes-sur-Loing · Seine-et-Marne",
    "hours": "Sur demande",
    "description": "Vanina Del-Puppo, formatrice en premiers secours canins et félins et praticienne en naturopathie animale.",
    "website": "https://www.patrouilleaupoil.fr/accueil",
    "id": "pro-19"
  },
  {
    "name": "Fleurs d’harmonie",
    "category": "bien",
    "city": "Magny-le-Hongre",
    "dept": "77",
    "lat": 48.863,
    "lng": 2.814,
    "zone": "Magny-le-Hongre",
    "hours": "Sur demande",
    "description": "Hayley Sheppard accompagne humains et animaux avec les Fleurs de Bach, la communication intuitive et le Reiki.",
    "website": "https://fleursdharmonie.com/contact/",
    "id": "pro-20"
  },
  {
    "name": "À Vos Pattes",
    "category": "educ",
    "city": "Treuzy-Levelay",
    "dept": "77",
    "lat": 48.265,
    "lng": 2.82,
    "zone": "Autour de Treuzy et Montereau-Fault-Yonne",
    "hours": "Sur demande",
    "description": "Christel, éducatrice comportementaliste, responsable de pension canine et intervenante PECCRAM.",
    "website": "https://avospattes.fr/",
    "id": "pro-21"
  }
];
export type Partner = { name: string; type: string; desc: string; code?: string; perk: string; conditions?: string; website: string; email?: string; socials?: { label: string; url: string }[] };
export const PARTNERS: Partner[] = [
  {
    "name": "Cernunos",
    "type": "Mastication",
    "desc": "Mastication en petits ou gros formats, notamment en sachets de 1 kg.",
    "perk": "Catalogue auprès de l’association",
    "website": "https://www.cernunos.fr/",
    "email": "contact.educdor@gmail.com"
  },
  {
    "name": "Flair’Rita",
    "type": "Artisanat & enrichissement",
    "desc": "Artisanat éthique pour animaux de compagnie : complicité, stimulation mentale et moments partagés.",
    "code": "ALVC",
    "perk": "5 % de réduction",
    "conditions": "Sur les plateaux de jeu, les modules à l’unité et le jeu de société Flair’Rita.",
    "website": "https://lescreaderita.fr/"
  },
  {
    "name": "Cynopod",
    "type": "Muselières sur mesure",
    "desc": "Des muselières adaptées et réalisées sur mesure.",
    "perk": "Avantage réservé aux adhérents",
    "conditions": "Code à demander au partenaire pour les commandes de muselières. Montant non précisé sur le site officiel.",
    "website": "https://www.instagram.com/cynopod/"
  },
  {
    "name": "Patte Saine",
    "type": "Friandises & BARF",
    "desc": "Entreprise familiale à Fontainebleau : friandises artisanales et produits BARF pour chiens et chats, recettes françaises sans additifs ni conservateurs.",
    "code": "MOA",
    "perk": "Code partenaire",
    "conditions": "Le site de l’association ne précise pas le montant ni les conditions de la réduction : à vérifier auprès de la boutique.",
    "website": "https://www.pattesaine.com/"
  },
  {
    "name": "VIK & CO",
    "type": "Friandises naturelles",
    "desc": "Une sélection de friandises 100 % naturelles, adaptées notamment aux chiens amateurs de mastication.",
    "perk": "Découvrir la sélection",
    "website": "https://vikandco.bigcartel.com/"
  },
  {
    "name": "Sublimypaws",
    "type": "Créations personnalisées",
    "desc": "Abygaëlle réalise à la main en France des créations personnalisées : mugs, textiles, lightbox, stickers et pots à friandises.",
    "perk": "Créations faites main",
    "website": "https://sublimypaws.fr/"
  },
  {
    "name": "Healthy Paw’s",
    "type": "Mastication & enrichissement",
    "desc": "Mastication naturelle, friandises et produits d’enrichissement, avec des conseils personnalisés et un engagement associatif.",
    "perk": "Découvrir la boutique",
    "website": "https://healthypaws.fr/"
  }
];

export type WalkEvent = { id: string; title: string; date: string; time: string; place: string; dept: string; kind: string; level: string; spots: number; desc: string };
// No dated upcoming event is published in the supplied official source.
export const EVENTS: WalkEvent[] = [];
export const MEMBERSHIP_URL = "https://www.helloasso.com/associations/association-la-voix-du-chien";
export const ACTIVITY_REQUIREMENTS = { behavioralAssessmentRequired: false, partnerAssessmentReusable: true };
export const ASSOCIATION_EMAIL = "associationlavoixduchien@gmail.com";
export const CONTENT_SOURCES = ["https://lavoixduchien.fr/services/", "https://lavoixduchien.fr/partenaires/", "https://lavoixduchien.fr/lassociation/", "https://lavoixduchien.fr/blog/"];
