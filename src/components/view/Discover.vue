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
						
						<v-flex style="transition: all 250ms"v-for="accomodation in accomodations"  :key="accomodation._id" v-bind:class="{xs12: accomodation.viewDetail}" class="xs3">
							<v-card >
							
								<div @click="onViewDetail(accomodation)" style="cursor:pointer;" v-if="!accomodation.viewDetail">
								
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
									<v-btn @click="accomodation.viewDetail = false;" color="primary" top absolute right fab><v-icon class="black--text">undo</v-icon></v-btn>	
									<v-container grid-list-lg>
										<v-layout v-viewer align-center row wrap>
											<v-flex v-for="(pic, index) in accomodation.images" :key="index" v-bind:class="{flex30 : index % 2 == 0, flex20 : index % 2 != 0}">
												<img height="auto" style="width:100%;cursor:pointer;" :src="pic.data"></img>
											</v-flex>
										</v-layout>
									</v-container>
									
									<v-card-title>
										<v-flex class="display-2 blue--text" xs12>{{ accomodation.name }}</v-flex>
										<v-flex class="subheading" xs12>{{ accomodation.description }}</v-flex>
									</v-card-title>
									
									<v-card-text>
									
										<v-layout row unwrap>
											<v-flex style="display:flex;" xs12 md6><v-btn class="mx-auto" outline large flat>CONTACTER</v-btn></v-flex>
											<v-flex style="display:flex;" xs12 md6><v-btn @click="onStartProcessBookAccomodation(accomodation)" class="mx-auto" color="secondary" outline large flat>
											<v-icon>{{ accomodation.showLocationProcess ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>RESERVER</v-btn></v-flex>
										</v-layout>				
									</v-card-text>
									
									<v-slide-y-transition>
							          <v-card-text v-show="accomodation.showLocationProcess && accomodation.calendar != null">
							          
							          <v-container v-if="accomodation.showLocationProcess && accomodation.calendar != null" grid-list-md>
							          	<v-layout row wrap>
							          		
							          		<v-flex xs6 offset-xs3>
									          <HotelDatePicker :startingDateValue="accomodation.reservation.startDate" :endingDateValue="accomodation.reservation.endDate" 
									          format="DD/MM/YYYY" :minNights="accomodation.durationmin" :maxNights="accomodation.durationmax" 
									          :disabledDates="getLockedDates(accomodation)" :disabledDaysOfWeek="getLockedDays(accomodation)"
									           @checkInChanged="accomodation.reservation.startDate = $event" @checkOutChanged="accomodation.reservation.endDate = $event"/>
							          		</v-flex>
							          		
							          	</v-layout>
							          </v-container>
							          
							          
							          </v-card-text>
							        </v-slide-y-transition>
									
								</div>
							
							</v-card>
						</v-flex>
					
		</v-container>
			
	</div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';
import moment from 'moment';

export default {
	components: {
		HotelDatePicker,
	},
	created: function() {
		this.$http.get("accomodation").then(response => {
			if (response.status == 200) {
				this.accomodations = response.body.accomodations;
				for (var accomodation in this.accomodations) {
// 					this.$set(this.accomodations[accomodation], 'viewDetail', false)
					this.$set(this.accomodations[accomodation], 'showLocationProcess', false)
					this.$set(this.accomodations[accomodation], 'viewDetail', true)
				}
			}
		})
	},
	data: function() {
		return {
			search: null,
			accomodations: [],
			//les traductions parce que le calendar est stocké en FR
			daysTraduction: [
				{fr: 'Lundi', en: 'Monday'},
				{fr: 'Mardi', en: 'Tuesday'},
				{fr: 'Mercredi', en: 'Wednesday'},
				{fr: 'Jeudi', en: 'Thursday'},
				{fr: 'Vendredi', en: 'Friday'},
				{fr: 'Samedi', en: 'Saturday'},
				{fr: 'Dimanche', en: 'Sunday'},
			]
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
			if (accomodation.fetch)
				accomodation.viewDetail = true;
			
			else
				this.$http.get("accomodation/" + accomodation._id).then(response => {
					console.log("accomodation")
					console.log(accomodation)
					if (response.status == 200) {
						//Permet de supprimer tous les champs sauf viewDetail qu'on a besoin de suivre pour mettre les valeurs du détail
							  Object.keys(accomodation).forEach(function(key) {
								if (key != 'viewDetail' && key != 'showLocationProcess')
							    	delete accomodation[key];
							  });
							  Object.keys(response.body.accomodation).forEach(function(key) {
							    accomodation[key] = response.body.accomodation[key];
							  });
							accomodation.fetch = true;
							accomodation.viewDetail = true;
					
					}
				});
		},
		onStartProcessBookAccomodation(accomodation) {
			accomodation.showLocationProcess = !accomodation.showLocationProcess;
			this.$set(accomodation, 'calendar', null);
			this.$set(accomodation, 'reservation', {
				startDate: null,
				endDate: null
			});
			//je charge le calendrier des dates bloquées
			//TODO concaténer avec les jours déjà réservés
			if (accomodation.showLocationProcess && typeof accomodation.calendar != null) {
				this.$http.get("calendar/" + accomodation._id).then(response => {
					if (response.status == 200)
						accomodation.calendar = response.body.calendar;
				})
			}
		},
		getLockedDates(accomodation) {
			console.log("dates : " + typeof accomodation.calendar)
			if (accomodation.calendar != null) {
				return this.lodash.map(accomodation.calendar.lockedDates).map(function(date) {return moment(date).format('YYYY-MM-DD')})
			}
		},
		getLockedDays(accomodation) {
			var vue = this;
			console.log("days : " + typeof accomodation.calendar)
			if (accomodation.calendar != null) {
				var lockedDays = this.lodash.map(accomodation.calendar.lockedDays).map(function(day) {
					return vue.lodash.find(vue.daysTraduction, {'fr' : day}).en;
				});
				console.log(lockedDays)
				return lockedDays
			}
		},
	},
	
};
</script>

<style scss>

.datepicker__clear-button, .datepicker__close-button {
color: #2196F3 !important;
}
.datepicker {
	transform: translateY(-418px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ah-divider {
	height: 1px;
	border-top: 1px grey solid;
	width: 100%;
	background-color: #0000001e;
	opacity: 0.2;
	margin: 12px 0;
}
.flex20 {
	max-width:20%;
	flex-basis:20%;
}
.flex30 {
	max-width:30%;
	flex-basis:30%;
}
</style>
