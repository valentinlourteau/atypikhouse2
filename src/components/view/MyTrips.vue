<template>
  <div>
    <v-container fluid>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">
            Mes voyages
          </v-card-title>
          <v-data-table :headers="headers" :items="travels" hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.accomodation.name }}</td>
              <td>{{ moment(props.item.dateReservation).format('DD/MM/YYYY') }}</td>
              <td>{{ moment(props.item.dateDebut).format('DD/MM/YYYY') }}</td>
              <td>{{ moment(props.item.dateFin).format('DD/MM/YYYY') }}</td>
              <td>{{ props.item.nbrPersonnes }}</td>
              <td>{{ getStatusText(props.item.status) }}</td>
              <td class="justify-center layout px-0">
                <v-layout row justify-center>
                  <v-btn @click="$router.push('/tripDetail/' + props.item._id)" icon>
                    <v-icon color="teal">visibility</v-icon>
                  </v-btn>
                </v-layout>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>
<script>
  import Modal from "../Modal";
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: "Bien concerné", value: "Bien" },
        { text: "Date de réservation", value: "DDR" },
        { text: "Date de début", value: "dateDebut" },
        { text: "Date de fin", value: "dateFin" },
        { text: "Invités", value: "personnes" },
        { text: "Statut", value: "statut" },
        { text: "", value: "actions" }
      ],
      travels: []
    }),
    created() {
      this.$http
        .get("reservation/travels/" + this.$store.state.user.id)
        .then(response => {
          if (response.status == 200) {
            this.travels = response.body.reservations;
          }
        });
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
      }
    }
  };
</script>
<style>
  td {
    vertical-align: middle !important;
  
  }
</style> 