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
						
						<v-container grid-list-lg>
						<v-layout row wrap>
						<v-flex style="transition: all 250ms" v-for="accomodation in accomodations"  :key="accomodation._id" v-bind:class="{'md12 lg12 xl12': accomodation.viewDetail}" class="xs12 md4 lg3 xl2">
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
									<v-container v-viewer grid-list-lg>
										<v-layout  align-center row wrap>
											<v-flex v-for="(pic, index) in accomodation.images" :key="index" v-bind:class="{flex30 : index % 2 == 0, flex20 : index % 2 != 0}">
												<img height="auto" style="width:100%;cursor:pointer;" :src="pic.data" />
											</v-flex>
										</v-layout>
									</v-container>
									
									<v-card-title>
										<v-flex class="display-2 blue--text" xs12>{{ accomodation.name }}</v-flex>
										<v-flex class="subheading" xs12>{{ accomodation.description }}</v-flex>
									</v-card-title>
									
									<v-card-text>
									
										<v-layout row unwrap>
											<v-flex style="display:flex;" xs12 md6><v-btn @click="onContactOwner(accomodation)" class="mx-auto" outline large flat>CONTACTER</v-btn></v-flex>
											<v-flex style="display:flex;" xs12 md6><v-btn @click="onStartProcessBookAccomodation(accomodation)" class="mx-auto" color="secondary" outline large flat>
											<v-icon>{{ accomodation.showLocationProcess ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>RESERVER</v-btn></v-flex>
										</v-layout>				
									</v-card-text>
									
							          <v-card-text v-show="accomodation.showLocationProcess && accomodation.calendar != null">
							          
							          <v-container v-if="accomodation.showLocationProcess && accomodation.calendar != null" grid-list-md>
							          	<v-layout row wrap>
							          	
							          	<v-stepper v-model="accomodation.step" vertical>
							          	
										    <v-stepper-step :complete="accomodation.step > 1" step="1">
										      Choix des dates
										    </v-stepper-step>
										    <v-stepper-content step="1">
										    <div v-show="accomodation.step == 1">

                                              <!-- Affichage du prix par nuité -->
										    
										      <HotelDatePicker :startingDateValue="accomodation.reservation.startDate" :endingDateValue="accomodation.reservation.endDate" 
										          format="DD/MM/YYYY" :minNights="accomodation.durationmin" :maxNights="accomodation.durationmax" 
										          :disabledDates="getLockedDates(accomodation)" :disabledDaysOfWeek="getLockedDays(accomodation)"
										           @checkInChanged="accomodation.reservation.startDate = $event" @checkOutChanged="accomodation.reservation.endDate = $event"/>
										      <v-btn :disabled="accomodation.reservation.endDate == null" color="primary" @click.native="onGoStep2(accomodation)">Continue</v-btn>
										    
										    </div>
										    </v-stepper-content>
										    
										    <v-stepper-step  :complete="accomodation.step > 2" step="2">
										      Nombre de voyageurs
										    </v-stepper-step>
										    <v-stepper-content step="2">
										    <div v-show="accomodation.step == 2">
											    
											    <v-container fluid>
											        <v-layout row wrap>
												          <v-flex xs9>										    	
												          <v-slider label="Voyageurs" v-model="accomodation.reservation.nbVoyageurs" min="1" :max="accomodation.guests"></v-slider>
												          </v-flex>
												          <v-flex xs3>
												            <v-text-field v-model="accomodation.reservation.nbVoyageurs" type="number"></v-text-field>
												          </v-flex>

                                                          <v-flex xs12>
                                                            <v-divider></v-divider>
                                                          </v-flex>

                                                          <v-flex xs12>
                                                            <v-list>
                                                              <v-list-tile>
                                                                <v-list-tile-content>
                                                                  <v-list-tile-title>{{ accomodation.reservation.price }} €</v-list-tile-title>
                                                                  <v-list-tile-sub-title>Montant du séjour sur la base du nombre de voyageurs</v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                              </v-list-tile>

                                                              <v-list-tile>
                                                                <v-list-tile-content>
                                                                  <v-list-tile-title>{{ accomodation.reservation.AHTaxe }} €</v-list-tile-title>
                                                                  <v-list-tile-sub-title>Frais de gestion AtypikHouse</v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                              </v-list-tile>

                                                            </v-list>
                                                          </v-flex>

											          </v-layout>
										        </v-container>
										    
										    	<v-btn color="primary" @click.native="onChooseVisitorsBeforePay(accomodation)">Continue</v-btn>
										    	<v-btn @click="accomodation.step = 1" flat>Retour</v-btn>
										      
										    </div>
										    </v-stepper-content>
										    
										    <v-stepper-step  :complete="accomodation.step > 3" step="3">
										       Règlement
										    </v-stepper-step>
										    <v-stepper-content step="3">

											<div v-show="accomodation.step == 3">
											
												<v-jumbotron>
												    <v-container fill-height>
												      <v-layout align-center>
												        <v-flex>
												          <h3 class="display-3">C'est presque fini !</h3>
												          <span class="subheading">Vous êtes sur le point de finaliser la réservation d'un bien. Nous vous remercions de la confiance que vous accordez, à nous comme
												          au propriétaire.</span>
												          <v-divider class="my-3"></v-divider>
												          <div class="title mb-3">Montant à payer : {{ accomodation.reservation.totalAmount }} €</div>
												          
																<PayPal
																  :amount="accomodation.reservation.price"
																  currency="EUR"
																  :client="credentials"
																  env="sandbox"
																  @payment-completed="userHasPaid(accomodation)">
																</PayPal>

												        </v-flex>
												      </v-layout>
												    </v-container>
												  </v-jumbotron>
												
										      	<v-btn @click="accomodation.step = 2" flat>Retour</v-btn>
										    </div>
										    </v-stepper-content>
										    
										    
									    
									  </v-stepper>
							          		
							          	</v-layout>
							          </v-container>
							          
							          
							          </v-card-text>
							          
									  <contact-form :showModal="contactOwner" @close="contactOwner = false;" :sender="$store.state.user" receiver="accomodation.host"></contact-form>
									
								</div>
							
							</v-card>
						</v-flex>
						</v-layout>
						</v-container>
					
		</v-container>
		
			
	</div>
</template>

<script>
import PayPal from "vue-paypal-checkout";
import HotelDatePicker from "vue-hotel-datepicker";
import moment from "moment";
import ContactForm from "../ContactForm";

export default {
  components: {
    HotelDatePicker,
    PayPal,
    ContactForm
  },
  created: function() {
    this.$http.get("accomodation").then(response => {
      if (response.status == 200) {
        this.accomodations = response.body.accomodations;
        for (var accomodation in this.accomodations) {
          this.$set(this.accomodations[accomodation], "viewDetail", false);
          this.$set(
            this.accomodations[accomodation],
            "showLocationProcess",
            false
          );
        }
      }
    });
  },
  data: function() {
    return {
      search: null,
      accomodations: [],
      //les traductions parce que le calendar est stocké en FR
      daysTraduction: [
        { fr: "Lundi", en: "Monday" },
        { fr: "Mardi", en: "Tuesday" },
        { fr: "Mercredi", en: "Wednesday" },
        { fr: "Jeudi", en: "Thursday" },
        { fr: "Vendredi", en: "Friday" },
        { fr: "Samedi", en: "Saturday" },
        { fr: "Dimanche", en: "Sunday" }
      ],
      credentials: {
        sandbox:
          "ASRh-BZAq7jdqDlHHU7gspeJA9Ok-eeHvVYqtMIe9YJMpmbGdjS5yvLDK3JyGBMJdLwgBUt4kFkNEg03"
      },
      //La taxe AH, en %
      AHTaxe: 5,
      //La boite de dialogue pour contacter un propriétaire
      contactOwner: false
    };
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
      });
    },
    getTruncatedDescription(accomodation) {
      length = 86;
      if (accomodation.description == null) return "";
      else if (accomodation.description.length > length)
        return accomodation.description.substring(0, length) + " ...";
      else return accomodation.description.substring(0, length);
    },
    onViewDetail(accomodation) {
      if (accomodation.fetch) accomodation.viewDetail = true;
      else
        this.$http.get("accomodation/" + accomodation._id).then(response => {
          console.log("accomodation");
          console.log(accomodation);
          if (response.status == 200) {
            //Permet de supprimer tous les champs sauf viewDetail qu'on a besoin de suivre pour mettre les valeurs du détail
            Object.keys(accomodation).forEach(function(key) {
              if (key != "viewDetail" && key != "showLocationProcess")
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
      this.$set(accomodation, "step", 1);
      this.$set(accomodation, "calendar", null);
      this.$set(accomodation, "reservation", {
        startDate: null,
        endDate: null,
        nbVoyageurs: 1,
        price: "0",
        AHTaxe: 0,
        status: "attente",
        totalAmount: 0
      });
      //je charge le calendrier des dates bloquées
      //TODO concaténer avec les jours déjà réservés
      if (
        accomodation.showLocationProcess &&
        typeof accomodation.calendar != null
      ) {
        this.$http.get("calendar/" + accomodation._id).then(response => {
          if (response.status == 200)
            accomodation.calendar = response.body.calendar;
        });
      }
    },
    onContactOwner(accomodation) {
      this.contactOwner = true;
    },
    onChooseVisitorsBeforePay(accomodation) {
      //TODO Définir la tarification ici
      // 			accomodation.reservation.price = accomodation.reservation.nbVoyageurs * accomodation.tarification
      accomodation.reservation.price = "324";
      accomodation.reservation.taxe =
        accomodation.reservation.price * this.AHTaxe / 100;
      accomodation.reservation.totalAmount = (
        parseFloat(accomodation.reservation.price) +
        parseFloat(accomodation.reservation.taxe)
      ).toString();
      accomodation.step = 3;
    },
    userHasPaid(accomodation) {
      accomodation.reservation.status = "paid";
      //TODO requête http post reservation, si un utilisateur a déjà réservé entre temps on reçoit un message qui indique cela
      //router redirection vers le détail d'un voyage en cas de succès
    },
    getLockedDates(accomodation) {
      console.log("dates : " + typeof accomodation.calendar);
      if (accomodation.calendar != null) {
        return this.lodash
          .map(accomodation.calendar.lockedDates)
          .map(function(date) {
            return moment(date).format("YYYY-MM-DD");
          });
      }
    },
    getLockedDays(accomodation) {
      var vue = this;
      console.log("days : " + typeof accomodation.calendar);
      if (accomodation.calendar != null) {
        var lockedDays = this.lodash
          .map(accomodation.calendar.lockedDays)
          .map(function(day) {
            return vue.lodash.find(vue.daysTraduction, { fr: day }).en;
          });
        console.log(lockedDays);
        return lockedDays;
      }
    },
    onGoStep2(accomodation) {
      accomodation.step = 2;
    }
  }
};
</script>

<style scss>
.datepicker__clear-button,
.datepicker__close-button {
  color: #2196f3 !important;
}
.stepper {
  box-shadow: none;
}
.stepper,
.stepper__wrapper {
  overflow: visible;
}
.datepicker {
  transform: translateY(-418px);
}

.fade-enter-active,
.fade-leave-active {
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
  max-width: 20%;
  flex-basis: 20%;
}
.flex30 {
  max-width: 30%;
  flex-basis: 30%;
}
</style>
