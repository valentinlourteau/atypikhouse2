<template>
  <div>
    <section class="mx-5">
      <div class="display-4 my-4 center">
        CGV
      </div>
      <div class="subheading mb-3">
        En publiant votre annonce sur Atypikhouse.fr, vous acceptez les conditions suivantes. Nos annonces sont strictement reservees pour les hebergements insolites. Vous vous engagez sur l'honneur a ne pas mettre des hebergements non insolites. S'il apparait que cette condition n'est pas remplie, nous nous reservons le droit de supprimer votre annonce de nos supports, et de conserver, a titre de provision sur indemnite, le prix verse au titre du forfait, sans nous interdire d'entamer toutes autres actions judiciaires.
      </div>
      <div class="my-3">
        <h2 class="display-1">Les autorisations</h2>
        <div>L'annonceur reconnait savoir qu'il doit declarer en mairie la location et le cas echeant obtenir l'autorisation de changement d'usage avant de proposer son bien a la location.. Il s'engage a fournir a AtypikHouse.fr une declaration sur l'honneur attestant du respect de ces obligations et communique par ailleurs son numero de declaration du logement ou une declaration sur l'honneur attestant que le bien constitue bien sa residence principale
        </div>
      </div>

      <div class="my-3">
        <h2 class="display-1">L'annonce</h2>

        <div>
          Vous garantissez que les renseignements fournis sont exacts et ne sont entaches d'aucune erreur ou omission de caractere trompeur ou malhonnete. Notre responsabilite, en tant que Societe editrice ne pourra etre engagee, a quel que titre que ce soit, si les renseignements portes dans l'annonce ou si la qualite de l'annonceur se revelent inexactes. Nous ne publions qu'un seul bien par annonce. Le texte, les coordonnees telephoniques et le prix figurant dans les annonces peuvent etre modifies gratuitement en cours de parution. Toutefois le bien decrit doit rester celui d'origine sans possibilite d'y substituer un autre bien et le prix de vente, ou de location, ne peut etre augmente.
        </div>
      </div>

      <div class="my-3">
        <h2 class="display-1">Droit de rectification</h2>
        <div>Nous refusons l'utilisation d'un vocabulaire subjectif et sexuel : rare, ideal, coquet, a saisir, a debattre, negociable, super, magnifique, exceptionnel, jamais vu, extraordinaire, splendide, etc., ainsi que les abreviations, pour des raisons de clarte. Nous nous reservons le droit de modifier tout texte ne correspondant pas a ces criteres de publication. Seules les adresses de sites internet personnels pourront etre publiees dans l'annonce apres verification par nos services. Votre annonce sera diffusee sur le site Atypikhouse.fr, selon les tarifs et duree que vous avez choisis, le prix de ces forfaits etant indiques sur nos offres et supports.
        </div>

      </div>
      <div class="my-3">
        <h2 class="display-1">Droit de refus</h2>
        <div>Les hebergements insolites se reserve le droit de refuser toute annonce dont le caractere pourrait etre contraire a l'esprit et a la vocation du site.
        </div>

      </div>
      <div class="my-3">
        <h2 class="display-1">Conditions de validation des appreciations</h2>
        <h2 class="headline">Droit de refus</h2>
        <div>AtypikHouse se reserve le droit de refuser toute appreciation dont le caractere pourrait etre contraire a l'esprit et a la vocation du site, aux textes legislatifs et reglementaires en vigueur ou encore contraires aux "bonnes moeurs". Les appreciations laissees par les vacanciers et les reponses apportees par nos proprietaires ne sont en aucun cas nos opinions.
        </div>
        <h2 class="headline">Conditions de formulation d'une appreciation</h2>
        <div> Pour formuler une appreciation le vacancier doit respecter les conditions suivantes :

        </div>
        <ul>
          <li>-Avoir un compte utilisateur</li>
          <li>-Avoir sejourne dans les lieux et etre en mesure de nous apporter la preuve de son sejour</li>
          <li>-Avoir valide ses coordonnees ou son mail lors du depot de son appreciation
          </li>
          <li>-Ne pas etre le proprietaire de la location.
          </li>
          <li>-Une seule personne faisant partie du groupe de vacanciers peut laisser une appreciation.
          </li>
          <li>-Le contenu des appreciations doit etre en rapport avec la location concernee.
          </li>
        </ul>
        <h2 class="headline">Droit de reponse du proprietaire</h2>
        <div>Celui-ci doit etre redige par le proprietaire lui-meme ou un representant legal Notre service client est a votre disposition pour effectuer un retrait ou une modification sur l'appreciation laissee au 07.58.51.56.84 ou Atypikhouse@atypik.fr Signalez nous tout contenu ne respectant pas ces conditions a atypikhouse@atypik.fr apres verification de nos services, et si ces conditions ne sont pas respectees, nous procederons au retrait immediat de l'appreciation.</div>

      </div>
    </section>

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