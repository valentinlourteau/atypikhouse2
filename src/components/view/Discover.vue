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
      <v-divider></v-divider>
      
      <v-dialog v-model="dialog" persistent max-width="580">
        <v-btn slot="activator" color="white" text="black">Arrivée-Départ</v-btn>
        <v-card>
          <v-card-title>
            <h4>Dates de séjour</h4>
          </v-card-title>
          <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-date-picker v-model="filter.dateDebut"  color="primary"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm6 class="hidden-xs-only">
              <v-date-picker v-model="filter.dateFin" color="green lighten-1" header-color="primary"></v-date-picker>
            </v-flex>
          </v-layout>
          </v-card-text>
          <v-card-actions>
          <v-btn color="black" flat @click.native="dialog = false">Annuler</v-btn>
          <v-btn color="primary" flat @click.native="dialog = false">Valider</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog1" persistent max-width="580">
        <v-btn slot="activator" color="white" text="black">Prix</v-btn>
        <v-card>
              <div class="headline">Prix</div>
                  <v-divider></v-divider>
          <v-layout row wrap>
            <v-layout row wrap>
          
             <v-subheader>{{ $t('minimum.price.per.night') }}</v-subheader>  
             <v-flex xs8 ml-4 >        
            <v-slider :max="255" v-model="PriceMin" ></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="PriceMin" type="number"></v-text-field>
          </v-flex>
          <v-subheader>{{ $t('maximum.price.per.night') }}</v-subheader>  
          <v-flex xs8 xs8 ml-4  >        
            <v-slider :max="500" v-model="PriceMax" ></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="PriceMax" type="number"></v-text-field>
          </v-flex>
          </v-layout>
          
            
          </v-layout>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click.native="dialog1 = false">Annuler</v-btn>
          <v-btn color="primary" flat @click.native="dialog1 = false">Valider</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" persistent max-width="580">
        <v-btn slot="activator" color="white" text="black">Capacité</v-btn>
        <v-card ml4>
          <!-- Capacité d'accueil -->
          <v-flex xs12>
      <div class="headline">Capacité</div>
                  <v-divider></v-divider>
          </v-flex>
          <v-flex xs9 ml-4>
            <v-slider v-model="number" min="1" max="20" label="Nombre des personnes"></v-slider>                                   
          </v-flex>
          <v-flex xs3 ml-4>
            <v-text-field v-model="number"  type="number"  ></v-text-field>
          </v-flex ml-4>
          <!-- Nombre de lits -->
          <v-flex xs12 ml-4>
          </v-flex>
          <v-flex xs9 ml-4>
            <v-slider v-model="beds" min="1" max="20" xs9 label="Nombre des lits"></v-slider>
          </v-flex>
          <v-flex xs3 ml-4>
            <v-text-field v-model="beds" type="number" ></v-text-field>
          </v-flex>
          <!-- Nombre de chambres -->
          <v-flex xs12 ml-4>
          </v-flex>
          <v-flex xs9 ml-4>
            <v-slider v-model="rooms" min="1" max="20" xs9 label="Nombre des chambres"></v-slider>
          </v-flex>
          <v-flex xs3 ml-4>
            <v-text-field  v-model="rooms" type="number" ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click.native="dialog2 = false">Annuler</v-btn>
          <v-btn color="primary" flat @click.native="dialog2 = false">Valider</v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" persistent max-width="580">
        <v-btn slot="activator" color="white" text="black">Type de logement</v-btn>
        <v-card>
              <div class="headline">Type de logement</div>
                  <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex v-for="(type, index) in availableFilters.listOfAccomodationTypes" :key="type._id" xs12 md3>
                  <v-checkbox v-model="filter.selectedTypes" :value="type._id" :label="type.frname"></v-checkbox>
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>
              <v-btn color="black" flat @click.native="dialog3 = false">Annuler</v-btn>
              <v-btn color="primary" flat @click.native="dialog3 = false">Valider</v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog4" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-btn slot="activator" color="white" text="black">plus de filtres</v-btn>
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="dialog4 = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title color="black">Plus de filtres</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog4 = false" >Valider </v-btn>
              <v-btn dark flat @click.native="dialog4 = false">Annuler </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
    
            <v-divider></v-divider>
            <v-list >
              <v-subheader >Equipements</v-subheader>
                 <v-flex v-for="(equipment, index) in availableFilters.listOfEquipments" :key="equipment._id" xs12 md3>
                  <v-checkbox v-model="filter.selectedEquipments" :value="equipment._id" :label="equipment.frname"></v-checkbox>
                </v-flex>
                      <v-divider></v-divider>
              <v-subheader >Installations</v-subheader>
                  <v-flex v-for="(space, index) in availableFilters.listOfAvailableSpaces" :key="space._id" xs12 md3>
                  <v-checkbox v-model="filter.selectedSpaces" :value="space._id" :label="space.frname"></v-checkbox>
                </v-flex>
                         <v-divider></v-divider>
              <v-subheader >Règlement intérieur</v-subheader>
                  <v-flex v-for="(rule, index) in availableFilters.listOfAvailableRules" :key="rule._id" xs12 md3>
                  <v-checkbox v-model="filter.selectedRules" :value="rule._id" :label="rule.frname"></v-checkbox>                
                </v-flex>
            </v-list>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>
            <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex style="transition: all 250ms" v-for="accomodation in accomodations" :key="accomodation._id" v-bind:class="{'md12 lg12 xl12': accomodation.viewDetail}" class="xs12 md4 lg3 xl2">
            <v-card>
              <div @click="onViewDetail(accomodation)" style="cursor:pointer;" v-if="!accomodation.viewDetail">
                <div>
                  <v-card-media height="200px" :src="accomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : accomodation.images[0].data"></v-card-media>
                  <v-card-title primary-title>
                    <div class="headline" style="width:100%">{{ accomodation.name }}</div>
                    <div class="price" style="width:100%">{{ accomodation.priceNight}} € par nuit</div>
                    <div class="grey--text" style="width:100%">{{ getTruncatedDescription(accomodation) }}</div>
                  </v-card-title>
                </div>
              </div>
              <!-- si jamais je clique sur une carte pour afficher le détail -->
              <div v-if="accomodation.viewDetail">
                <v-btn @click="accomodation.viewDetail = false;" color="primary" top absolute right fab>
                  <v-icon class="black--text">undo</v-icon>
                </v-btn>
                <v-container v-viewer grid-list-lg>
                  <v-layout align-center row wrap>
                    <v-flex v-for="(pic, index) in accomodation.images" :key="index" v-bind:class="{flex30 : index % 2 == 0, flex20 : index % 2 != 0}">
                      <img height="auto" style="width:100%;cursor:pointer;" :src="pic.data" />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-title>
                  <v-flex class="display-2 blue--text" xs12>{{ accomodation.name }}</v-flex>
                  <v-flex class="subheading" xs12>{{ accomodation.priceNight}}€ par nuit</v-flex>
                  <v-flex class="subheading" xs12>{{ accomodation.description }}</v-flex>
                </v-card-title>
                <v-card-text>
                  <v-layout row unwrap>
                    <v-flex style="display:flex;" xs12 md6>
                      <v-btn @click="onContactOwner(accomodation)" class="mx-auto" outline large flat>CONTACTER</v-btn>
                    </v-flex>
                    <v-flex style="display:flex;" xs12 md6>
                      <v-btn @click="onStartProcessBookAccomodation(accomodation)" class="mx-auto" color="secondary" outline large flat>
                        <v-icon>{{ accomodation.showLocationProcess ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>RESERVER</v-btn>
                    </v-flex>
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
                            <HotelDatePicker :startingDateValue="accomodation.reservation.dateDebut" :endingDateValue="accomodation.reservation.dateFin" format="DD/MM/YYYY" :minNights="accomodation.durationmin" :maxNights="accomodation.durationmax" :disabledDates="getLockedDates(accomodation)" :disabledDaysOfWeek="getLockedDays(accomodation)" @checkInChanged="accomodation.reservation.dateDebut = $event" @checkOutChanged="accomodation.reservation.dateFin = $event" />
                            <div v-if="accomodation.reservation.dateFin != null && accomodation.reservation.dateDebut != null"> {{ nbNightsBetweenTwoDates(accomodation) }} nuits</div>
                            <div v-else>0 nuit</div>
                            <v-btn :disabled="accomodation.reservation.dateFin == null" color="primary" @click.native="onGoStep2(accomodation)">Continue</v-btn>
                          </div>
                        </v-stepper-content>
                        <v-stepper-step :complete="accomodation.step > 2" step="2">
                          Nombre de voyageurs
                        </v-stepper-step>
                        <v-stepper-content step="2">
                          <div v-show="accomodation.step == 2">
                            <v-container fluid>
                              <v-layout row wrap>
                                <v-flex xs9>
                                  <v-slider label="Voyageurs" v-model="accomodation.reservation.nbrPersonnes" min="1" :max="accomodation.guests"></v-slider>
                                </v-flex>
                                <v-flex xs3>
                                  <v-text-field v-model="accomodation.reservation.nbrPersonnes" type="number"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                  <v-divider></v-divider>
                                </v-flex>
                                <v-flex xs12>
                                  <v-list>
                                    <v-list-tile>
                                      <v-list-tile-content>
                                        <v-list-tile-title>{{ getPriceOfAccomodation(accomodation) }} €</v-list-tile-title>
                                        <v-list-tile-sub-title>Montant du séjour sur la base du nombre de nuits</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                      <v-list-tile-content>
                                        <v-list-tile-title>{{ getTaxeAmount(accomodation) }} €</v-list-tile-title>
                                        <v-list-tile-sub-title>Frais de gestion AtypikHouse</v-list-tile-sub-title>
                                      </v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                      <v-list-tile-content>
                                        <v-list-tile-title>{{ getTotalAmountToPay(accomodation) }} €</v-list-tile-title>
                                        <v-list-tile-sub-title>Montant total à régler</v-list-tile-sub-title>
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
                        <v-stepper-step :complete="accomodation.step > 3" step="3">
                          Règlement
                        </v-stepper-step>
                        <v-stepper-content step="3">
                          <div v-show="accomodation.step == 3">
                            <v-jumbotron>
                              <v-container fill-height>
                                <v-layout align-center>
                                  <v-flex>
                                    <h3 class="display-3">C'est presque fini !</h3>
                                    <span class="subheading">Vous êtes sur le point de finaliser la réservation d'un bien. Nous vous remercions de la confiance que vous accordez, à nous comme au propriétaire.</span>
                                    <v-divider class="my-3"></v-divider>
                                    <div class="title mb-3">Montant à payer : {{ accomodation.reservation.totalAmount }} €</div>
                                    <PayPal :amount="accomodation.reservation.price.toString()" currency="EUR" :client="credentials" env="sandbox" @payment-completed="userHasPaid(accomodation)">
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
                 <contact-form :showModal="contactOwner" @close="contactOwner = false;" :receiverProp="accomodation.host"></contact-form>

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
  import ListService from "../../class/services/ListService";
  import Modal from '../Modal';
  export default {
    components: {
      HotelDatePicker,
      PayPal,
      ContactForm,
      Modal,
    },
    created: function() {
      
      ListService.fetchList("accomodationTypes", this.availableFilters.listOfAccomodationTypes);
      ListService.fetchList("accomodationEquipements", this.availableFilters.listOfEquipments);
      ListService.fetchList("accomodationAvailableSpaces",this.availableFilters.listOfAvailableSpaces);
      ListService.fetchList("accomodationRules", this.availableFilters.listOfAvailableRules);
      
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
        dialog: false,
        dialog1 :false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        filter: {
          dateDebut: null,
          dateFin: null,
          selectedEquipments: [],
        },
        availableFilters: {
          listOfAccomodationTypes: [],
          listOfEquipments:[],
          listOfAvailableSpaces:[],
          listOfAvailableRules:[],
        },
     PriceMin:'',
     PriceMax:'',
     number:'',
     beds:'',
     rooms:'',
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
            "ASV2UoEKitc5KSR1jltaQS1pW-NgIYuZtQSwxUx_rDmwt1MRIF8lyK8ipgg0mxAHUE2tymSsU5SYT2zH"
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
            // console.log("accomodation");
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
              //fetch pour préciser qu'on a déjà fait le get du détail
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
          dateDebut: null,
          dateFin: null,
          nbrPersonnes: 1,
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
        accomodation.reservation.price = this.getTotalAmountToPay(accomodation);
        accomodation.reservation.taxe = this.getTaxeAmount(accomodation);
        accomodation.reservation.totalAmount = this.getTotalAmountToPay(
          accomodation
        );
        accomodation.step = 3;
      },
      userHasPaid(accomodation) {
        var vue = this;
        var reservation = Object.assign({}, accomodation.reservation);
        reservation.status = "A";
        reservation.accomodation = accomodation._id;
        this.$http.post("reservation", reservation).then(response => {
          if (response.status == 200) {
            this.$store.commit("snackbar", "Réservation effectuée");
            accomodation.viewDetail = false;
            setTimeout(function() {
              vue.$store.commit("snackbar", "Accès à la réservation");
              //TODO rediriger vers le détail de la réservation
            }, 1500);
          }
        });
        //ervé entre temps on reçoit un message qui indique cela
        //router redirection vers le détail d'un voyage en cas de succèsTODO requête http post reservation, si un utilisateur a déjà rés
      },
    getLockedDates(accomodation) {
        // console.log("dates : " + typeof accomodation.calendar);
        var lockedDates = [];
        if (accomodation.calendar != null) {
          lockedDates = this.lodash
            .map(accomodation.calendar.lockedDates)
            .map(function(date) {
              return moment(date).format("YYYY-MM-DD");
            });
        }
        //Ajout des jours réservés
        if (
          accomodation.reservations != null &&
          accomodation.reservations.length > 0
        ) {
          accomodation.reservations.forEach(reservation => {
            if (reservation.status == "C" || reservation.status == "D") {
              var startDate, endDate;
              startDate = moment(reservation.dateDebut);
              endDate = moment(reservation.dateFin);
              var now = startDate.clone(),
                dates = [];
              while (now.isSameOrBefore(endDate)) {
                lockedDates.push(now.format("YYYY-MM-DD"));
                now.add(1, "days");
              }
            }
          });
        }
        console.log(lockedDates.length);
        return lockedDates;
      },
      getLockedDays(accomodation) {
        var vue = this;
        // console.log("days : " + typeof accomodation.calendar);
        if (accomodation.calendar != null) {
          var lockedDays = this.lodash
            .map(accomodation.calendar.lockedDays)
            .map(function(day) {
              return vue.lodash.find(vue.daysTraduction, { fr: day }).en;
            });
          // console.log(lockedDays);
          return lockedDays;
        }
      },
      onGoStep2(accomodation) {
        accomodation.step = 2;
      },
      nbNightsBetweenTwoDates(accomodation) {
        return moment(accomodation.reservation.dateFin).diff(
          moment(accomodation.reservation.dateDebut),
          "days"
        );
      },
      //calcule le prix de la réservation en fonction du nombre du jour
      getPriceOfAccomodation(accomodation) {
        return (
          accomodation.priceNight *
          this.nbNightsBetweenTwoDates(accomodation)*accomodation.reservation.nbrPersonnes
        );
      },
      //calcule le prix de la taxe
      getTaxeAmount(accomodation) {
        return this.getPriceOfAccomodation(accomodation) * this.AHTaxe / 100;
      },

      getTotalAmountToPay(accomodation) {
        return (
          this.getTaxeAmount(accomodation) +
          this.getPriceOfAccomodation(accomodation)
        );
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