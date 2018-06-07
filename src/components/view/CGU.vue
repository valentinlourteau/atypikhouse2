<template>
  <div>
    <v-container fluid sm4>
        <v-layout row wrap>
          <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
            <v-card>
  
    <section class="mx-5">
      <div class="display-4 my-4 center">
        Conditions generales
      </div>
      <v-alert :value="true" outline color="info" icon="info">Le 25 mai 2018, le reglement europeen est entre en application. De nombreuses formalites aupres de la CNIL disparaissent. En contrepartie, la responsabilite de AtypikHouse est renforcee. Nous avons assurer une protection optimale des donnees a chaque instant et etre en mesure de la demontrer en documentant leur conformite.</v-alert>
      <div class="subheading mb-3">
        Bienvenue sur www.atypikhouse.fr le service fourni par atypikHouse, qui vous permet d acceder et recevoir des informations sur les offres des locations, et qui vous permet egalement de mettre voter bien insolite en location. AtypikHouse a un capital de 10.000 Euro, compsee de 3 associes partageant les memes passions pour les voyages,l'habitat alternatif et la vie en harmonie avec la nature. Nous reunissons les moyens techniques et financiers, nos competences et nos amities, nous avons cree notre societe: sur la location d'habitation insolites, comme les cabanes dans les arabres, les yourtes ou les cabanes flottantes... Rappelez-vous, en tout etat de cause, que l'utilisation du Site Web et de ses fonctions librement accessibles comporte l'acceptation de votre part aux preentes Conditions Generales d utilisation.</div>
      <div class="my-3">
        <h2 class="display-1">Les Enregistrement</h2>
        <div>Pour vous enregistrer au service, l'utilisateur ("l'utilisateur") completera le procede d enregistrement disponible sur le site Web et obtiendra son identification personnelle. L'utilisateur certifie que toutes les donnees personnelles et les informations fournies pendant le processus d'enregistrement sont bien a jour, completes, precises et veridiques. L utilisateur s engage a communiquer a AtypikHouse tout changement des donnees personnelles. L'utilisateur autorise AtypikHouse a verifier l'exactitude des donnees personnelles et de toute autre information fournie et s'engage a cooperer avec AtypikHouse lors d'une telle verification. A la fin du processus d enregistrement, l utilisateur recevra un moyen d authentification, se composant d une identification de l utilisateur et d un mot de passe secret dont l utilisateur sera l unique responsable pour toutes les activites entreprises. L Utilisateur est responsable des activites effectuees sur le site par le biais de son identifiant utilisateur et de son mot de passe. Toutes les operations et demandes effectuees par le biais de l'identifiant et du mot de passe de l utilisateur doivent etre attribues a l utilisateur. Par consequent, l utilisateur est responsable de tout dommage et prejudice causes a AtypikHouse ou a un tiers a la suite d'une utilisation abusive, de la perte, du detournement et / ou de compromettre la confidentialite de l identifiant et du mot de passe de l utilisateur. L Utilisateur reconnait que AtypikHouse.fr peut egalement produire comme preuve, les operations effectuees par l utilisateur, les preuves obtenues a partir des systemes et procedures utilisees par AtypikHouse.fr, afin de reglementer l acces au site Web et de fournir le service.</div>
      </div>

      <div class="my-3">
        <h2 class="display-1"> Description du Service
        </h2>

        <div>Une fois enregistre, l usager pourra acceder au Service de AtypikHouse qui comprend l envoi d information tant sur les offres des hebegements insolites disponible, l acces et l utilisation du moteur de recherche AtypikHouse pour rechercher et consulter les meilleures offres.</div>
      </div>

      <div class="my-3">
        <h2 class="display-1">Utilisation du Site Web :Commandes</h2>
        <div>L Usager peut visiter librement le Site Web et utiliser ses fonctionnalites . En effectuant ses propres recherches sur le moteur de recherche ou en effectuant des reservations ou commandes, l Usager reconnait et declare agir directement dans un but personnel. En effectuant les recherches, les reservations et commandes, l Usager utilise l'application web moyennant une licence non exclusive et temporaire, concedee en usage pour le temps de l operation. Cette application permet a l Usager d effectuer directement et facilement ses demandes sans avoir besoin d une connexion parallele directe au site Internet du fournisseur du service interesse. Il est interdit a l'Usager de modifier, reutiliser, copier, diffuser, transmettre, reproduire, publier, conceder en licence ou en usage, creer des travaux derives, ceder ou vendre ou, en tout etat de cause, faire un usage commercial et non personnel des informations, des nouvelles des contenus, du logiciel et des systemes, des produits obtenus ou qui lui sont disponibles a travers le Site Web et l'utilisation du Service. Pour pouvoir utiliser les fonctions du Site Web, l Usager doit se procurer, bien entendu a ses frais, une connexion Internet aupres d un fournisseur fiable. AtypikHouse n est aucunement responsable des eventuels dommages subis par le materiel informatique de l'usager et derivant directement ou indirectement des connexions Internet.</div>

      </div>
      <div class="my-3">
        <h2 class="display-1">Regles de conduite</h2>
        <div>L utilisateur s engage a utiliser le site Web, ses fonctions et le service pour des buts legaux et selon les Conditions Generales d utilisation En particulier, l utilisateur s engage a n envoyer, ni diffuser, via le site Web et ses fonctions, tout contenu illicite, diffamatoire, vulgaire, obscene, ou abusif, ni a employer le site Web et ses fonctions pour ternir l image et la reputation de AtypikHouse ou tout autre perte ou dommages a AtypikHouse. De plus, l utilisateur s engage a ne pas envoyer de communications publicitaires, indesirables et/ou non sollicitees qui pourraient alterer la fonctionnalite et/ou l utilisation du site Web par des tiers.</div>

      </div>

    </section>
    </v-card>
    </v-flex>
    </v-layout>
		</v-container>

    <v-footer height="auto" color="primary">
			<v-layout row wrap justify-center>
				<v-btn v-for="link in links" :key="link.title" color="white" flat>
					<v-list-tile v-if="link.links == null" :to="link.link" class="black--text" active-class="yellow--text black">
						{{link.title }}
					</v-list-tile>
				</v-btn>
				<v-flex xs12 py-3 text-xs-center black--text> &copy;2018 —
					<strong>Tous droits réservés © De AtypikHouse - Réseau des hébergements insolite </strong>
				</v-flex>
			</v-layout>
		</v-footer>
  </div>
</template>
<script>
  import About from "../view/About";
  export default {
    data() {
      return {
        links: [
          {
            title: "CGV",
            link: "/cgv"
          },
          {
            title: "Contact",
            link: "/contact"
          },
          {
            title: "Plan du site",
            link: "/plansite"
          },
          {
            title: "CGU",
            link: "/cgu"
          },
          {
            title: "Mentions legales",
            link: "/mentionlegale"
          }
        ]
      };
    }
  };
</script>
<style>
</style>