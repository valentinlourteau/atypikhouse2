/* La page sur les voyages, experiences ... */
<template>
	<div>
		<v-container >
			<v-layout class="mx-auto" row wrap>
			<v-flex xs6 offset-xs3 align-center>
				<v-text-field prepend-icon="search" v-model="search" :placeholder="getRandomPlaceHolder()" solo></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-btn class="mx-auto" style="display:block;" color="secondary" @click="imLucky()" flat>Surprenez moi !</v-btn>
			</v-flex>
			</v-layout>
						
						<v-flex	v-for="accomodation in accomodations" @click="onViewDetail(accomodation)" :key="accomodation._id" v-bind:class="{xs12: accomodation.viewDetail}" class="xs3">
							<v-card >
							
								<div v-if="!accomodation.viewDetail">
								
									<div >
										<v-card-media height="200px" :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data"></v-card-media>
										<v-card-title primary-title>
											<div class="headline" style="width:100%">{{ accomodation.name }}</div>
											<div class="price" style="width:100%">50€ par nuit</div>
											<div class="grey--text" style="width:100%">{{ getTruncatedDescription(accomodation) }}</div>
										</v-card-title>
									</div>
								
								</div>
								
								<!-- si jamais je clique sur une carte pour afficher le détail -->
								<div v-if="accomodation.viewDetail">
									<v-card-media height="200px" :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data"></v-card-media>
								</div>
							
							</v-card>
						</v-flex>
					
		</v-container>	
			
	</div>
</template>

<script>

export default {
	created: function() {
		this.$http.get("accomodation").then(response => {
			if (response.status == 200) {
				this.accomodations = response.body.accomodations;
				for (var accomodation in this.accomodations) {
					console.log(this.accomodations[accomodation])
					this.$set(this.accomodations[accomodation], 'viewDetail', false)
				}
			}
		})
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
			this.selectedAccomodation = null;
			//remplacer par un vrai get, du moins voir comment on va quérir la liste des accomodations vis à vis de la recherche 
			this.$http.get("accomodation").then(response => {
				if (response.status == 200) {
					this.accomodations = response.body.accomodations;
					for (var accomodation in this.accomodations) {
						this.accomodations[accomodation].viewDetail = true;
					}
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
		onViewDetail(accomodation) {
// 			var index = this.accomodations.indexOf(accomodation);
			console.log("click")
			accomodation.viewDetail = true;
// 			this.accomodations[index] = accomodation;
// 				this.$http.get("accomodation/" + accomodation._id).then(response => {
// 					if (response.status == 200) {
// 						this.accomodation = response.body.accomodation;
// 					}
// 				});
		},
	},
	
};
</script>

<style scss>
.ah-divider {
	height: 1px;
	border-top: 1px grey solid;
	width: 100%;
	background-color: #0000001e;
	opacity: 0.2;
	margin: 12px 0;
}
</style>
