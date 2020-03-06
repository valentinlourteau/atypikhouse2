<template>
  <div>
    <v-tabs v-model="activeTab" color="yellow" slider-color="black" centered @input="onChangeTab($event)">
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
        <span class="black--text">{{ tab.text }}</span>
      </v-tab>
      <!-- Resume -->
      <v-tab-item>
        <v-layout row wrap class="mx-2">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
                <v-card>
                  <v-card-title>
                    <v-form ref="generalInformationsForm">
                      <v-subheader>Informations générales</v-subheader>
                      <v-card-text v-if="reservation != null">


                        <label class="label">Date de réservation</label>
                        <div>{{ moment(reservation.dateReservation).format('DD/MM/YYYY') }}</div>
                        <label class="label">Date de début</label>
                        <div>{{ moment(reservation.dateDebut).format('DD/MM/YYYY') }}</div>
                        <label class="label">Date de fin</label>
                        <div>{{ moment(reservation.dateFin).format('DD/MM/YYYY') }}</div>
                        <label class="label">Nombre de personnes conviées</label>
                        <div>{{ reservation.nbrPersonnes }}</div>
                        <label class="label">Status de la réservation</label>
                        <div>{{ getStatusText(reservation.status) }}</div>

                      </v-card-text>
                      <v-card-actions>
                      </v-card-actions>
                    </v-form>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </v-tab-item>
      <!-- Avis -->
      <v-tab-item>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>

            <v-flex v-if="reservation != null && (reservation.status != 'C' || moment(reservation.dateFin).isAfter(moment()))" xs12>
              <v-alert type="warning" :value="true">Vous pourrez commenter ce voyage lorsque la date de fin sera échue.</v-alert>
            </v-flex>
            <!-- Le bien en lui même -->
            <v-flex v-if="selectedAccomodation != null" xs12 sm4 lg4 xl3>
              <v-card>
                <v-card-media height="200px" :src="selectedAccomodation.images[0] == null ? '/static/images/no_bkg_state.svg' : selectedAccomodation.images[0].data"></v-card-media>
                <v-card-title primary-title>
                  <div class="headline" style="width:100%">{{ selectedAccomodation.name }}</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn v-if="canIReview()" @click="onInitAddPictures(selectedAccomodation)" flat color="secondary">PHOTOGRAPHIER</v-btn>
                  <v-btn v-if="canIReview()" @click="onInitAddReview(selectedAccomodation)" flat color="secondary">AVIS</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <!-- La liste des activités à proximité -->
            <v-flex v-for="activity in selectedActivities" :key="activity._id" v-if="selectedActivities.length > 0" xs12 sm4 lg4 xl3>
              <v-card>
                <v-card-media height="200px" :src="activity.images[0] == null ? '/static/images/no_bkg_state.svg' : activity.images[0].data"></v-card-media>
                <v-card-title primary-title>
                  <div class="headline" style="width:100%">{{ activity.name }}</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn v-if="canIReview()" @click="onInitAddPictures(activity)" flat color="secondary">PHOTOGRAPHIER</v-btn>
                  <v-btn v-if="canIReview()" @click="onInitAddReview(activity)" flat color="secondary">AVIS</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

    </v-tabs>

    <!-- Le dialog d'avis -->
    <v-dialog v-if="selectedItem != null" v-model="dialogAvis" max-width="500px">
      <v-card>
        <v-card-title>
          <v-subheader>Rédiger un avis sur {{ selectedItem.name }}</v-subheader>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="review.review" label="Votre avis !" multi-line></v-text-field>
          <v-subheader>Une note qui reflète votre niveau de satisfaction ! Soyez honnêtes !</v-subheader>
          <star-rating :increment="0.5" :max-rating="5" @rating-selected="setRating"></star-rating>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="dialogAvis = false">Annuler</v-btn>
          <!-- TODO Mapper les routes -->
          <v-btn color="secondary" flat @click="dialogPictures = false">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Le dialog d'ajout de photos -->
    <v-dialog v-if="selectedItem != null" v-model="dialogPictures" max-width="500px">
      <v-card>
        <v-card-title>
          <v-subheader>Ajouter des prises de vue sur {{ selectedItem.name }}</v-subheader>
        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="dialogPictures = false">Annuler</v-btn>
          <!-- TODO mapper les routes  -->
          <v-btn color="secondary" flat @click="dialogPictures = false">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script >
  import Accomodation from "./../../class/entities/Accomodation";
  import ReadWriteField from "../utility/ReadWriteField";
  import FileUpload from "./../utility/FileUpload";
  import StarRating from "vue-star-rating";
  export default {
    components: {
      ReadWriteField,
      FileUpload,
      StarRating
    },
    created: function() {
      var vue = this;
      this.$http
        .get("reservation/findById/" + this.$route.params.reservationId)
        .then(response => {
          if (response.status == 200) {
            this.reservation = response.body.reservation;
            console.log(this.reservation.accomodation);
            this.$http
              .get("activity/" + this.reservation.accomodation)
              .then(response => {
                if (response.status == 200) {
                  vue.selectedActivities = vue.selectedActivities.concat(
                    response.body.activities
                  );
                  console.log(vue.selectedActivities.length);
                }
              });
            this.$http
              .get("accomodation/light/" + this.reservation.accomodation)
              .then(response => {
                if (response.status == 200) {
                  vue.selectedAccomodation = response.body.accomodation;
                }
              });
          }
        });
    },
    data: function() {
      return {
        dialogPictures: false,
        dialogAvis: false,
        dialog: false,
        generalInformationsReadMode: true,
        imageData: "",
        comment: "",
        activeTab: null,
        tabs: [{ text: "Resume" }, { text: "Avis" }],
        reservation: null,
        selectedAccomodation: null,
        selectedActivities: [],
        selectedItem: null,
        review: {
          review: "",
          rating: 2.5
        }
      };
    },
    methods: {
      previewImage: function(event) {
        var input = event.target;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = e => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      onChangeTab(event) {},
      onInitAddPictures(selectedItem) {
        this.selectedItem = selectedItem;
        this.dialogPictures = true;
      },
      onInitAddReview(selectedItem) {
        this.selectedItem = selectedItem;
        this.dialogAvis = true;
      },
      setRating(rating) {
        this.review.rating = rating;
      },
      getStatusText(statut) {
        switch (statut) {
          case "A":
            return "Payé - en attente de validation";
            break;
          case "B":
            return "Payé - refusé";
            break;
          case "C":
            return "Payé - accepté";
            break;
          case "D":
            return "Terminée - séjour effectué";
            break;
          default:
            return "";
        }
      },
      canIReview(reservation) {
        return (
          reservation != null &&
          (reservation.status == "C" &&
            moment(reservation.dateFin).isAfter(moment()))
        );
      }
    }
  };
</script>
<style>
  .file-upload-form,
  .image-preview {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 20px;
  }
  img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #ddd;
    padding: 5px;
  }
  .label {
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.54);
  }
</style>