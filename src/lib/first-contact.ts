// Questions reprises du Google Form officiel « Faisons connaissance » (particuliers).
export type Question = {
  id: string;
  label: string;
  help?: string;
  type: "text" | "textarea" | "radio" | "checkbox";
  options?: string[];
  other?: boolean;
};
export type Section = { title: string; intro?: string; questions: Question[] };

export const RINTINTIN_URL = "https://rintintin-booking.com/pro/association-la-voix-du-chien";
export const PRO_GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfK9-z7pmoIlAIy-F9xg7rK16rWT_dXO7rMkIZWV7uQSxJM1g/viewform";

const yesNoUnknown = ["Non", "Oui", "Je ne sais pas"];

export const PARTICULIER_SECTIONS: Section[] = [
  {
    title: "Faisons connaissance",
    intro: "Quelques informations pour pouvoir vous recontacter et comprendre comment vous avez découvert l’association.",
    questions: [
      { id: "dog", label: "Nom du chien & race", type: "text" },
      { id: "department", label: "Dans quel département êtes-vous situé ?", type: "checkbox", options: ["Loiret - 45", "Seine-et-Marne - 77", "Yonne - 89"], other: true },
      { id: "discovery", label: "Comment avez-vous connu La Voix du Chien ?", help: "Plusieurs réponses possibles.", type: "checkbox", options: ["Par un professionnel ou un éducateur canin", "Par le bouche-à-oreille", "Sur les réseaux sociaux", "Lors d’un salon ou d’un événement", "Via Internet ou plateforme extérieure"] },
      { id: "referent", label: "Avez-vous un professionnel référent ?", help: "Le nom du professionnel est facultatif.", type: "text" },
    ],
  },
  {
    title: "Votre demande",
    intro: "Parlez-nous de l’activité qui vous intéresse et de ce que vous aimeriez vivre ou découvrir au sein de l’association.",
    questions: [
      { id: "activity", label: "Pour quelle activité ou quel événement nous contactez-vous ?", type: "text" },
      { id: "expectation", label: "Avez-vous une attente particulière concernant cette activité ?", help: "Par exemple : découvrir une pratique, mieux comprendre mon chien, rencontrer un professionnel ou partager un moment agréable.", type: "text" },
    ],
  },
  {
    title: "Votre chien et ses besoins",
    intro: "Ces questions ne servent pas à juger votre chien. Elles nous aident à comprendre ses besoins et les situations où il pourrait avoir besoin de plus de distance ou d’accompagnement.",
    questions: [
      { id: "age", label: "Quel est son âge ou sa date de naissance ?", type: "text" },
      { id: "sex", label: "Sexe", type: "radio", options: ["Femelle", "Mâle"] },
      { id: "sterilized", label: "Stérilisé(e)", type: "radio", options: ["Oui", "Non"] },
      { id: "vaccines", label: "Vaccins à jour", type: "radio", options: ["Oui", "Non", "Primo vaccination"] },
      { id: "temperament", label: "Quel est son tempérament général ?", type: "checkbox", options: ["Calme", "Énergique", "Anxieux", "Sociable", "Dépendant", "Harceleur", "Joueur", "Protecteur", "Agressif", "Peureux", "Timide", "Indépendant"], other: true },
      { id: "health", label: "Présente-t-il un problème de santé, une douleur ou une difficulté physique pouvant influencer sa participation ?", type: "radio", options: yesNoUnknown },
      { id: "health_detail", label: "Si oui, quelle difficulté ou quel traitement ?", type: "text" },
      { id: "allergies", label: "A-t-il des allergies ou des restrictions alimentaires ?", type: "radio", options: yesNoUnknown },
      { id: "allergies_detail", label: "Si oui :", help: "Précisez les aliments à éviter et les récompenses qu’il peut recevoir.", type: "text" },
      { id: "behaviors", label: "A-t-il des comportements spécifiques ?", type: "checkbox", options: ["Aboiements excessifs", "Propreté", "Mordillements", "Fugues", "Peurs / Phobies", "Prédation / Rappel", "Réactivité humains", "Réactivité congénères", "Mauvaise communication canine", "Contrôle sur le mouvement", "Protection de ressource (précisez dans « autre »)"], other: true },
      { id: "new_env", label: "Comment vit-il généralement la découverte d’un nouvel environnement ?", type: "checkbox", options: ["Il explore facilement et semble rapidement à l’aise", "Il a besoin d’un temps d’observation", "Il peut être très excité", "Il peut être inquiet ou avoir besoin de distance", "Cela dépend beaucoup du lieu", "Je ne sais pas encore"], other: true },
      { id: "strangers", label: "Comment se comporte-t-il avec les personnes qu’il ne connaît pas ?", help: "Plusieurs réponses possibles.", type: "checkbox", options: ["Il recherche facilement le contact calmement", "Il préfère observer à distance", "Il évite le contact", "Il peut être très excité et sauter", "Il peut aboyer ou grogner", "Il peut être inquiet face aux gestes ou approches directes", "Il peut charger directement"], other: true },
      { id: "distance", label: "Dans quelles situations peut-il avoir besoin de davantage de distance ou d’accompagnement ?", help: "Plusieurs réponses possibles.", type: "checkbox", options: ["Aucune situation particulière connue", "Proximité avec d’autres chiens", "Présence de personnes inconnues", "Présence d’enfants", "Bruits importants", "Mouvements rapides", "Nourriture, jouets ou autres ressources", "Environnement très stimulant", "Attente (statique, voiture) ou frustration", "Objet électrique ou électronique (trottinette, drone…)", "Mauvaise communication canine"] },
      { id: "discomfort_signs", label: "Quels comportements observez-vous lorsqu’il commence à être inconfortable ?", help: "Par exemple : il détourne la tête, s’éloigne, se fige, halète, aboie, grogne, tire en laisse ou recherche votre proximité.", type: "textarea" },
      { id: "incident", label: "A-t-il déjà vécu un incident avec une personne ou un autre animal ?", type: "checkbox", options: ["Non", "Oui, sans blessure", "Oui, avec morsure ou blessure", "Je préfère en parler directement avec un professionnel", "Je ne connais pas son passé"], other: true },
      { id: "incident_detail", label: "Si oui :", help: "Décrivez brièvement le contexte pour organiser l’activité en sécurité et sans jugement.", type: "text" },
      { id: "dog_reactions", label: "Présente-t-il des réactions de désagrément face à certains comportements ou races de chiens ?", type: "textarea" },
      { id: "dog_preferences", label: "Montre-t-il une préférence vis-à-vis des congénères ? (taille, race, sexe, comportement…)", type: "textarea" },
    ],
  },
  {
    title: "Votre confort pendant l’activité",
    intro: "Le bien-être des humains compte aussi. Ces informations nous permettent de prévoir un accueil adapté.",
    questions: [
      { id: "human_discomfort", label: "Une situation pourrait-elle vous mettre mal à l’aise pendant une activité ?", help: "Par exemple : proximité avec certains chiens, groupe important, difficulté à vous déplacer, peur particulière.", type: "text" },
      { id: "availability", label: "Généralement, quelles sont vos disponibilités pour des activités ?", type: "checkbox", options: ["Matinée 9h - 12h", "Midi 12h - 14h", "Après-midi 14h - 18h", "Fin de journée après 18h"] },
      { id: "max_distance", label: "Distance maximale acceptable (en km)", type: "text" },
      { id: "budget", label: "Budget mensuel envisagé", type: "text" },
    ],
  },
  {
    title: "Pour rester informé(e)",
    questions: [
      { id: "newsletter", label: "Acceptez-vous de recevoir les actualités et les informations sur les prochaines activités ?", type: "radio", options: ["Oui", "Non"] },
      { id: "membership_brochure", label: "Souhaitez-vous recevoir notre fascicule de présentation de l’adhésion ?", help: "Fonctionnement de l’association, avantages adhérents et soutien à nos actions.", type: "radio", options: ["Oui, je souhaite le recevoir par e-mail", "Oui, et j’aimerais échanger avec un membre de l’association", "Peut-être plus tard", "Non, merci"] },
      { id: "image_rights", label: "Droit à l’image", help: "Des photos ou vidéos peuvent être réalisées lors de nos rencontres pour partager la vie de l’association (site, réseaux sociaux).", type: "radio", options: ["J’accepte que des photos/vidéos soient utilisées pour la communication de l’association.", "J’accepte uniquement pour mon chien (pas de photo/vidéo où je suis reconnaissable).", "Je refuse toute prise de vue et diffusion d’images me concernant ou concernant mon chien."] },
    ],
  },
];

export const PRO_SECTIONS: Section[] = [
  {
    title: "Votre activité",
    questions: [
      { id: "business", label: "Nom de votre structure / activité", type: "text" },
      { id: "profession", label: "Votre métier", type: "checkbox", options: ["Éducateur / comportementaliste", "Photographe", "Bien-être (ostéo, massage…)", "Pet sitting / garde", "Secourisme canin", "Toilettage", "Boutique / marque"], other: true },
      { id: "department", label: "Secteurs d’intervention", type: "checkbox", options: ["Seine-et-Marne - 77", "Loiret - 45", "Yonne - 89", "Essonne - 91"], other: true },
      { id: "website", label: "Site internet ou réseaux sociaux", type: "text" },
    ],
  },
  {
    title: "Votre demande",
    questions: [
      { id: "request", label: "Ce qui vous intéresse", type: "checkbox", options: ["Rejoindre le réseau / adhérer", "Être référencé dans l’annuaire", "Proposer un partenariat ou un code promo", "Animer un atelier ou une activité", "Simple prise d’information"], other: true },
      { id: "message", label: "Présentez-nous votre projet", type: "textarea" },
      { id: "newsletter", label: "Souhaitez-vous recevoir les actualités de l’association ?", type: "radio", options: ["Oui", "Non"] },
    ],
  },
];

export const RGPD_NOTICE =
  "Les informations recueillies sont utilisées par La Voix du Chien pour traiter votre demande, vous recontacter et préparer votre participation aux activités. Certaines informations utiles peuvent être transmises aux professionnels intervenant lors de l’activité concernée. Vous disposez d’un droit d’accès, de rectification, d’opposition et de retrait à tout moment : associationlavoixduchien@gmail.com.";
