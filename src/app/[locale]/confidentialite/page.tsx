import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { SITE } from "@/lib/constants";
import { Link } from "@/i18n/routing";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        title={isFr ? "Politique de confidentialité" : "Privacy policy"}
      />
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-secondary/80">
          {isFr ? (
            <>
              <h2>Collecte des données</h2>
              <p>
                {SITE.name} collecte les données personnelles que vous fournissez via nos
                formulaires de contact et de devis (nom, email, téléphone, message).
              </p>
              <h2>Données personnelles collectées</h2>
              <p>
                Selon votre utilisation du site, nous pouvons collecter les informations suivantes :
              </p>
              <ul>
                <li>Identité : nom, prénom</li>
                <li>Coordonnées : adresse email, numéro de téléphone</li>
                <li>Contenu des messages : objet, description de projet, pièces jointes</li>
                <li>Données de navigation : cookies, préférences de langue, consentement</li>
              </ul>
              <h2>Consentement</h2>
              <p>
                En cliquant sur « J&apos;accepte les cookies et mes données » dans la bannière affichée
                lors de votre première visite, vous consentez expressément :
              </p>
              <ul>
                <li>à l&apos;utilisation des cookies sur notre site ;</li>
                <li>au traitement de vos données personnelles tel que décrit dans la présente politique ;</li>
                <li>à la collecte des informations que vous nous transmettez via nos formulaires.</li>
              </ul>
              <p>
                Ce consentement est libre, spécifique, éclairé et univoque. Il est enregistré avec la
                date d&apos;acceptation et conservé pendant 12 mois.
              </p>
              <h2>Utilisation des données</h2>
              <p>
                Ces données sont utilisées uniquement pour répondre à vos demandes et vous
                accompagner dans vos projets.
              </p>
              <h2>Conservation</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre
                demande, puis archivées conformément à la réglementation.
              </p>
              <h2>Cookies</h2>
              <p>
                Notre site utilise des cookies pour assurer son bon fonctionnement, mémoriser vos
                préférences (notamment votre consentement) et améliorer votre expérience de
                navigation.
              </p>
              <ul>
                <li>
                  <strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site
                  (session, sécurité, mémorisation de votre choix concernant les cookies).
                </li>
                <li>
                  <strong>Cookies de préférences</strong> : permettent de retenir vos choix (langue,
                  consentement aux cookies).
                </li>
              </ul>
              <p>
                Lors de votre première visite, une bannière vous invite à accepter l&apos;utilisation
                des cookies, le traitement de vos données personnelles et la présente politique de
                confidentialité. Sans cet accord, nous vous invitons à ne pas utiliser les
                formulaires du site. Vous pouvez à tout moment retirer votre consentement en
                supprimant les cookies via les paramètres de votre navigateur et en nous contactant
                à {SITE.email}.
              </p>
              <h2>Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
                suppression de vos données. Contactez-nous à {SITE.email}.
              </p>
            </>
          ) : (
            <>
              <h2>Data collection</h2>
              <p>
                {SITE.name} collects personal data you provide through our contact and quote forms
                (name, email, phone, message).
              </p>
              <h2>Personal data collected</h2>
              <p>Depending on how you use the site, we may collect the following information:</p>
              <ul>
                <li>Identity: first and last name</li>
                <li>Contact details: email address, phone number</li>
                <li>Message content: subject, project description, attachments</li>
                <li>Browsing data: cookies, language preferences, consent status</li>
              </ul>
              <h2>Consent</h2>
              <p>
                By clicking &quot;I accept cookies and my data&quot; in the banner shown on your first
                visit, you expressly consent to:
              </p>
              <ul>
                <li>the use of cookies on our website;</li>
                <li>the processing of your personal data as described in this policy;</li>
                <li>the collection of information you submit through our forms.</li>
              </ul>
              <p>
                This consent is freely given, specific, informed and unambiguous. It is recorded
                with the acceptance date and kept for 12 months.
              </p>
              <h2>Data usage</h2>
              <p>
                This data is used solely to respond to your requests and support you with your
                projects.
              </p>
              <h2>Retention</h2>
              <p>
                Your data is kept for as long as needed to process your request, then archived in
                accordance with applicable regulations.
              </p>
              <h2>Cookies</h2>
              <p>
                Our website uses cookies to ensure proper operation, remember your preferences
                (including your consent) and improve your browsing experience.
              </p>
              <ul>
                <li>
                  <strong>Essential cookies</strong>: required for the site to work (session,
                  security, remembering your cookie choice).
                </li>
                <li>
                  <strong>Preference cookies</strong>: remember your choices (language, cookie
                  consent).
                </li>
              </ul>
              <p>
                On your first visit, a banner invites you to accept cookies, the processing of your
                personal data and this privacy policy. Without this agreement, we ask that you do
                not use the site&apos;s forms. You may withdraw your consent at any time by deleting
                cookies through your browser settings and contacting us at {SITE.email}.
              </p>
              <h2>Your rights</h2>
              <p>
                Under GDPR, you have the right to access, rectify and delete your data. Contact us
                at {SITE.email}.
              </p>
            </>
          )}
          <p className="not-prose mt-8">
            <Link href="/" className="text-primary font-medium hover:underline">
              {isFr ? "← Retour à l'accueil" : "← Back to home"}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
