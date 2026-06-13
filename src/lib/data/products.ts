export interface ProductData {
  slug: string;
  name: string;
  logo: string;
  taglineFr: string;
  taglineEn: string;
  introFr: string;
  introEn: string;
  whyTitleFr: string;
  whyTitleEn: string;
  whyItemsFr: string[];
  whyItemsEn: string[];
  featuresTitleFr: string;
  featuresTitleEn: string;
  featuresFr: string[];
  featuresEn: string[];
  missionTitleFr: string;
  missionTitleEn: string;
  missionFr: string;
  missionEn: string;
  promiseTitleFr: string;
  promiseTitleEn: string;
  promiseFr: string;
  promiseEn: string;
  sloganFr: string;
  sloganEn: string;
}

export const PRODUCTS: ProductData[] = [
  {
    slug: "invitation-de-baby",
    name: "InvitationDeBaby",
    logo: "/images/products/invitation-de-baby.png",
    taglineFr:
      "La carte d'invitation digitale moderne pour célébrer les plus beaux moments de votre bébé",
    taglineEn:
      "The modern digital invitation card to celebrate your baby's most beautiful moments",
    introFr:
      "InvitationDeBaby est une solution digitale innovante conçue pour simplifier et moderniser l'organisation des événements liés à la naissance et à la vie de votre enfant. Grâce à notre plateforme, créez en quelques minutes de magnifiques cartes d'invitation numériques personnalisées pour annoncer et célébrer les moments importants de votre bébé : naissance, baptême, anniversaire, présentation au public, baby shower et bien plus encore.",
    introEn:
      "InvitationDeBaby is an innovative digital solution designed to simplify and modernize the organization of events related to your child's birth and life. With our platform, create beautiful personalized digital invitation cards in minutes to announce and celebrate your baby's important moments: birth, baptism, birthday, public presentation, baby shower and much more.",
    whyTitleFr: "Pourquoi choisir InvitationDeBaby ?",
    whyTitleEn: "Why choose InvitationDeBaby?",
    whyItemsFr: [
      "Création rapide et personnalisée de cartes d'invitation élégantes",
      "Partage instantané via WhatsApp, Facebook, Instagram, Email ou SMS",
      "Gestion simplifiée des invités et des confirmations de présence",
      "Design moderne et adapté à tous les écrans (mobile, tablette, ordinateur)",
      "Économie sur les frais d'impression et de distribution",
      "Solution écologique et 100 % numérique",
    ],
    whyItemsEn: [
      "Fast and personalized creation of elegant invitation cards",
      "Instant sharing via WhatsApp, Facebook, Instagram, Email or SMS",
      "Simplified guest management and attendance confirmations",
      "Modern design adapted to all screens (mobile, tablet, computer)",
      "Savings on printing and distribution costs",
      "Eco-friendly and 100% digital solution",
    ],
    featuresTitleFr: "Fonctionnalités principales",
    featuresTitleEn: "Main features",
    featuresFr: [
      "Création de cartes d'invitation personnalisées",
      "Galerie de thèmes modernes et élégants",
      "Gestion des listes d'invités",
      "Confirmation de présence (RSVP)",
      "Partage par lien sécurisé",
      "Affichage de la date, de l'heure et du lieu de l'événement",
      "Intégration de photos et vidéos du bébé",
      "Compte à rebours avant l'événement",
      "Livre d'or numérique",
      "Remerciements après l'événement",
    ],
    featuresEn: [
      "Personalized invitation card creation",
      "Gallery of modern and elegant themes",
      "Guest list management",
      "Attendance confirmation (RSVP)",
      "Secure link sharing",
      "Display of event date, time and location",
      "Baby photos and videos integration",
      "Countdown before the event",
      "Digital guestbook",
      "Thank-you messages after the event",
    ],
    missionTitleFr: "Notre mission",
    missionTitleEn: "Our mission",
    missionFr:
      "Chez InvitationDeBaby, nous croyons que chaque naissance et chaque célébration mérite une annonce exceptionnelle. Notre mission est d'offrir aux familles une solution simple, élégante et moderne pour partager leur bonheur avec leurs proches, où qu'ils se trouvent.",
    missionEn:
      "At InvitationDeBaby, we believe that every birth and every celebration deserves an exceptional announcement. Our mission is to offer families a simple, elegant and modern solution to share their joy with loved ones, wherever they are.",
    promiseTitleFr: "Notre promesse",
    promiseTitleEn: "Our promise",
    promiseFr:
      "Transformer chaque invitation en une expérience mémorable grâce à la puissance du digital.",
    promiseEn:
      "Transform every invitation into a memorable experience through the power of digital.",
    sloganFr: "Parce que les plus beaux souvenirs commencent par une belle invitation.",
    sloganEn: "Because the most beautiful memories start with a beautiful invitation.",
  },
];

export function getProduct(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
