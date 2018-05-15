/* La page sur les voyages, experiences ... */
<template>
	<div>
		<v-container>
			<v-layout class="mx-auto" row wrap>
			<v-flex xs6 offset-xs3 align-center>
				<v-text-field prepend-icon="search" v-model="search" :placeholder="getRandomPlaceHolder()" solo></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-btn class="mx-auto" style="display:block;" color="secondary" @click="imLucky()" flat>Surprenez moi !</v-btn>
			</v-flex>
			</v-layout>
						
						<div class="cards mt-3">
						<v-flex style="display:inline-block;width:100%" class="mb-3" v-for="accomodation in accomodations">
						<v-card style="width:100%;" >
							<v-card-media height="200px" :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data"></v-card-media>
							<v-card-title primary-title>
								<div class="headline" style="width:100%">{{ accomodation.name }}</div>
								<div class="price" style="width:100%">50€ par nuit</div>
								<v-divider></v-divider>
								<div class="grey--text">{{ getTruncatedDescription(accomodation) }}</div>
							</v-card-title>
							<v-card-text>
								
							
							</v-card-text>
						</v-card>
						</v-flex>
						</div>
					
		</v-container>	
	</div>
</template>

<script>

export default {
	created: function() {
	},
	data: function() {
		return {
			search: null,
			accomodations: [],
		}
	},
	methods: {
		getRandomPlaceHolder() {
			return "Une maison sous l'eau";
		},
		imLucky() {
			//remplacer par un vrai get, du moins voir comment on va quérir la liste des accomodations vis à vis de la recherche 
			this.$http.get("accomodation").then(response => {
				if (response.status == 200)
					this.accomodations = response.body.accomodations;
			})
		},
		getTruncatedDescription(accomodation) {
			length = 86;
			if (accomodation.description == null)
				return "";
			else if (accomodation.description.length > length)
				return accomodation.description.substring(0, length) + " ...";
			else
				return accomodation.description.substring(0, length);
		},
	},
	
};
</script>

<style>
.card {
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden; 
}
.cards {
	column-count: 1;
	column-gap: 16px;
}
@media only screen and (min-width: 600px) {
  .cards {
    column-count: 2;
  }
}

@media only screen and (min-width: 960px) {
  .cards {
    column-count: 3;
  }
}

@media only screen and (min-width: 1264px) {
  .cards {
    column-count: 3;
  }
}

@media only screen and (min-width: 1904px) {
  .cards {
    column-count: 4;
  }
}
</style>
