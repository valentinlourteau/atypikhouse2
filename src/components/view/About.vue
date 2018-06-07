<template>
	<div>

		<section class="header">

			<v-carousel>
				<v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
			</v-carousel>

		</section>

		<v-layout row wrap>
			<v-flex xs12 md6 offset-md3>
				<v-card>

					<v-card-text>

						<section class="mx-5">
							<div class="display-4 my-4">Qui sommes-nous?</div>
							<div class="subheading mb-3">Crée en 2018, AtypikHouse est un incontournable de la location saisonniére entre particuliers. AtypikHouse offre aux particuliers la possibilité de louer leur logement (maison ou appartement) a d'autres particuliers, en toute autonomie et en toute sécurité, tout en évitant les frais d'agence. Depuis sa création, de nombreux propriétaires nous font confiance pour mettre en valeur leur location vacances, et leur permettre de rentabiliser leur bien.</div>
							<div class="my-3">
								<h2 class="display-1">Un site accessible aux particuliers</h2>
								<div>Exclusivement réservé aux particuliers, votre bien est mis en ligne sur notre site et diffusé a des milliers de personnes en recherche de leur future location de vacances. Nos forfaits s'adaptent a vos besoins en fonction des saisonnalités et du type de bien, tout est mis en oeuvre pour vous faciliter la tache et c'est toujours sans commission !</div>
							</div>

							<div class="my-3">
								<h2 class="display-1">Un site accessible aux professionnels</h2>

								<div>Un site réservé aux professionnels, votre bien est mis en ligne sur notre site et diffusé a des milliers de personnes en recherche de leur future location de vacances. Nos forfaits s'adaptent a vos besoins en fonction des saisonnalités et du type de bien, tout est mis en oeuvre pour vous faciliter la tache et c'est toujours sans commission !</div>
							</div>

							<div class="my-3">
								<h2 class="display-1">Nos Service</h2>
								<div>Tout est mis en oeuvre pour vous faciliter la tache ! Nous mettons a votre disposition gratuitement des informations et des outils indispensables pour faciliter votre location :</div>

								<ul>
									<li>Une annonce détaillée avec jusqu'a 12 photos pour l'illustrer, de quoi donner envie aux vacanciers de séjourner chez vous.</li>
									<li>La possibilité de tenir a jour un calendrier de vos disponibilités et de vos offres promotionnelles si nécessaires</li>
									<li>Vous avez meme la possibilité de recueillir les avis de vos locataires !</li>
									<li>Et nous pouvons également vous fournir des modéles de lettres ou de contrats.</li>
								</ul>
							</div>
						</section>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-container>
			<v-layout row nowrap>
				<v-flex xs4>

					<div>
						<v-icon>call</v-icon>
						+033 02 02 02 02 02
						<h5>Service Client</h5>
						<p>Du lundi au samedi du 9h à 18h</p>
					</div>

				</v-flex>
				<v-flex xs4>
					<h2 class="center light-blue-text">
						<i class="material-icons">euro_symbol</i>
					</h2>
					<h5 class="center">Paiement sécusiré</h5>

					<img src="/static/images/paiement.png" width="182" height="85" />

					<p class="light">PayBox vous permet de payer sans communiquer vos informations financières à un tiers. PayPal crypte automatiquement vos données confidentielles à l'aide des meilleures technologies disponibles sur le marché (système de télépaiement SSL -Secure Sockets Layer). PayBox assure la confidentialité de vos informations financières tout en vous garantissant une protection à 100% contre les paiements non autorisés effectués depuis votre compte.
					</p>
				</v-flex>
				<v-flex xs4>
					<h2 class="center light-blue-text">
						<i class="material-icons">verified_user</i>
					</h2>
					<h5 class="center">Réservation instantanée</h5>

					<p class="light">La réservation instantanée simplifie la vie des voyageurs et permet souvent de doubler le nombre de réservations des hôtes.</p>
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
	export default {
	  data() {
	    return {
	      items: [
	        {
	          src: "/static/images/image7.jpg"
	        },
	        {
	          src: "/static/images/image2.jpg"
	        },
	        {
	          src: "/static/images/image3.png"
	        },
	        {
	          src: "/static/images/image4.jpg"
	        }
	      ],
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
	  },
	  methods: {
	    bonjour() {}
	  }
	};
</script>