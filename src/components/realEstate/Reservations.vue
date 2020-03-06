<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <div class="subheader">Reservations</div>
            </v-card-title>

            <v-data-table :headers="headers" :items="reservations" hide-actions>
              <template slot="items" slot-scope="props">
                <td>{{ props.item.guest.firstname }} {{ props.item.guest.lastname }}</td>
                <td>{{ props.item.nbrPersonnes }}</td>
                <td>{{ moment(props.item.dateReservation).format('DD/MM/YYYY') }}</td>
                <td>{{ moment(props.item.dateDebut).format('DD/MM/YYYY') }}</td>
                <td>{{ moment(props.item.dateFin).format('DD/MM/YYYY') }}</td>
                <td>{{ props.item.totalAmount }}</td>
                <td>{{ getStatusText(props.item.status) }}</td>
                <td>
                <v-menu v-if="props.item.status == 'A'" offset-y>
            <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="onValidateReservation(props.item)">
                <v-list-tile-title>Valider</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="onDeclinateReservation(props.item)">
                <v-list-tile-title>Refuser</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
               </td>

              </template>
            </v-data-table>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>
<script>
import moment from 'moment';
  export default {
    data: () => ({
      reservations: [],
      headers: [
          { text: "Loueur", value: "locataire" },
          { text: "Personnes", value: "nbrLocataires" },
          { text: "Date de réservation", value: "dateRes" },
          { text: "Date de début", value: "dateDebut" },
          { text: "Date de fin", value: "dateFin" },
          { text: "Montant total", value: "total" },
          { text: "Statut", value: "status" },
          { text: "", value: "actions" },
        ],
    }),
    props: ["accomodationId"],
    watch: {
    'accomodationId': function(newVal, oldVal) {
        this.$http.get("reservation/" + this.accomodationId).then(response => {
          if (response.status == 200) {
            this.reservations = this.lodash.orderBy(response.body.reservations, ['dateReservation'], ['asc']);
          }
        })
    }
  },
    created() {
    },
    methods: {
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
      onValidateReservation(reservation) {
        console.log("reservation/changeStatus/" + reservation._id)
        this.$http.put("reservation/changeStatus/" + reservation._id, {status: "C"}).then(response => {
          if (response.status == 200) {
            reservation.status = response.body.reservation.status;
            this.$store.commit("snackbar", "Reservation validée");
          }
        })
      },
      onDeclinateReservation(reservation) {
        this.$http.put("reservation/changeStatus/" + reservation._id, {status: "B"}).then(response => {
          if (response.status == 200) {
            reservation.status = response.body.reservation.status;
            this.$store.commit("snackbar", "Reservation déclinée");
          }
        })
      },
    },
  };
</script>


<style>
  td {
    vertical-align: middle !important;
  }
</style>