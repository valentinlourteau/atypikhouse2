/* La page de création d'un nouveau bien ... */
<template>
<div>
	<div class="container">
		
		 <v-stepper v-model="stepIndex">
		 
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepIndex > 1">Préambule</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepIndex > 2">Localisation</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="stepIndex > 3">L'essentiel</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="stepIndex > 4">Equipements</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete="stepIndex > 5">Espaces accessibles</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6" :complete="stepIndex > 6">Avant de finir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7" :complete="stepIndex > 7">Le mot de la fin</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="8" :complete="stepIndex > 8">Pour accueillir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="9" :complete="stepIndex > 9">Règlement</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="10" :complete="stepIndex > 10">Qui peut réserver ?</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="11" :complete="stepIndex > 11">Calendrier</v-stepper-step>
      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px">
          	<p>Ici, quelques infos du site sur l'intérêt et les engagements relatifs à la publication d'un hébergement. le fait que chaque étape validée enregistre la réservation pour la continuer plus tard si besoin
          	est</p>
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 2">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px">La localisation du bien, une gmaps, le type de bien, une estimation des prix</v-card>
          <v-btn color="primary" @click.native="stepIndex = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Quelques informations essentielles sur le bien, bien complet, partie seulement ..., le nombre de voyageurs possible, nombre et configuration des lits</v-card>
          <v-btn color="primary" @click.native="stepIndex = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-5" height="200px">La liste des équipements proposés par le bien</v-card>
          <v-btn color="primary" @click.native="stepIndex = 5">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-card color="grey lighten-1" class="mb-5" height="200px">L'ensemble des espaces disponibles pour l'utilisateur au sein de la propriété, jardin, cuisine, jaccuzi, etc ..</v-card>
          <v-btn color="primary" @click.native="stepIndex = 6">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="6">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Donner une description personnalisée, du bien, ce qui le rend atypique, 
          ajouter des photos avec légendes, définir la photo qui sera mùise en avant sur la pubnlications. Le titre de l'annonce</v-card>
          <v-btn color="primary" @click.native="stepIndex = 7">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="7">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Ici, le titre de l'annonce, et éventuellement des mots clés fournis par le site pour classer l'annonce, à voir pour cette partie :
          'en famille', 'en amoureux', 'nature', 'dépaysement'</v-card>
          <v-btn color="primary" @click.native="stepIndex = 8">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="8">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications générales (explications plus précises sur les pages concernées) sur la tarification, calendrier, comment accueillir le visiteur. Explications sur les obligations à remplir par
          le visiteur pour pouvoir louer le bien, typiquement numéro de téléphone vérifié, informations de payement, carte d'identité... Possiblité d'ajotuer des contrainte supplémentaires, ID, Recommandations ..
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 9">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="9">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Quelles règles appliquer, adapté aux bébés, fumeur ... Et également les infos à connaitre sur le logement ,zone inondable, animaux dangereux, armes etc
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 10">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="10">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Récapitulatif sur qui peut réserver et comment, infos en plus...
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 11">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="11">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications détaillées sur le calendrier
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 12">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
      
    </v-stepper>
    
    <!-- Chaque step peut disposer d'une v-card d'aide, d'informations supplémentaires, voir airbnb -->
		
		
	</div>
	
</div>
</template>

<script>

export default {
	data: function() {
		return {
			stepIndex: 0,
		}
	},
	methods: {
	},
	mounted: function() {
	},
};
</script>

<style>
</style>
