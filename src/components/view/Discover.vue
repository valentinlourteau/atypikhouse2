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
						<v-card :class="accomodation.viewDetail==true ? 'absolute' : ''" style="width:100%" >
						<div v-on:click="onShowDetail(accomodation)" v-if="!accomodation.viewDetail">
							<v-card-media height="200px" :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data"></v-card-media>
							<v-card-title primary-title>
								<div class="headline" style="width:100%">{{ accomodation.name }}</div>
								<div class="price" style="width:100%">50€ par nuit</div>
								<div class="grey--text" style="width:100%">{{ getTruncatedDescription(accomodation) }}</div>
<!-- 								<div class="ah-divider"></div> -->
							</v-card-title>
<!-- 							<v-card-text> -->
<!-- 							test -->
<!-- 							</v-card-text> -->
						</div>
						
						<div v-if="selectedAccomodation != null && selectedAccomodation.fetch">
							<v-carousel hide-controls>
								<v-carousel-item v-for="(item,i) in selectedAccomodation.images" :src="item.data" :key="i"></v-carousel-item>
							</v-carousel>
							<v-card-title primary-title>
								<div class="display-4" style="width:100%">{{ selectedAccomodation.name }}</div>
								<div class="grey--text headline" style="width:100%">{{ getTruncatedDescription(selectedAccomodation) }}</div>
<!-- 								<div class="ah-divider"></div> -->
							</v-card-title>
<!-- 							<v-card-text> -->
<!-- 							test -->
<!-- 							</v-card-text> -->
							<v-card-actions>
								<v-btn @click.native="accomodation.viewDetail=false;selectedAccomodation=null;" color="primary" flat>Fermer</v-btn>
							</v-card-actions>
						</div>
						
						</v-card>
						</v-flex>
						</div>
					
		</v-container>	
	</div>
</template>

<script>

export default {
	created: function() {
		this.$http.get("accomodation").then(response => {
			if (response.status == 200) {
				for (var accomodation in response.body.accomodations) {
					response.body.accomodations[accomodation].viewDetail = false;
				}
				this.accomodations = response.body.accomodations;
			}
		})
	},
	data: function() {
		return {
			search: null,
			accomodations: [],
			selectedAccomodation: null,
		}
	},
	methods: {
		getRandomPlaceHolder() {
			return "Une maison sous l'eau";
		},
		imLucky() {
			//remplacer par un vrai get, du moins voir comment on va quérir la liste des accomodations vis à vis de la recherche 
			this.$http.get("accomodation").then(response => {
				if (response.status == 200) {
					for (var accomodation in response.body.accomodations) {
						response.body.accomodations[accomodation].viewDetail = false;
					}
					this.accomodations = response.body.accomodations;
				}
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
		onShowDetail(accomodation) {
			this.accomodation = null;
			if (!accomodation.fetch)
				this.$http.get("accomodation/" + accomodation._id).then(response => {
					if (response.status == 200) {
						response.body.accomodation.fetch = true;
						this.selectedAccomodation = response.body.accomodation;
					}
				});
			if (accomodation.viewDetail != true) {
				accomodation.viewDetail = true;
				console.log("je passe")
			}
		},
	},
	
};
</script>

<style>
.ah-divider {
	height: 1px;
	border-top: 1px grey solid;
	width: 100%;
	background-color: #0000001e;
	opacity: 0.2;
	margin: 12px 0;
}

.card {
  transition: top, right, left, bottom, width, eight 2000ms;
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden; 
  top: initial;
  bottom: initial;
  right: initial;
  left: initial;
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
.content--wrap {
position:relative;
}
.absolute {
position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
