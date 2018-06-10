<template>
  <div>
    </v-dialog>
    <v-container fluid>
      <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
        <v-card>
          <v-card-title class="headline">
            Mes voyages
          </v-card-title>
          <v-data-table :headers="headers" :items="destinat" hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.destination }}</td>
              <td class="text-xs-right">{{ props.item.DDS }}</td>
              <td class="text-xs-right">{{ props.item.DFS }}</td>

              <td class="justify-center layout px-0">
                <v-layout row justify-center>

                  <v-btn icon to='/tripDetail' slot="activator">
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
      show: false,
      dialog: false,
      headers: [
        {
          text: "Destination",
          align: "left	",
          sortable: false,
          value: "destination"
        },
        { text: "Date debut de sejours", align: "right", value: "DDS" },
        { text: "Date fin de sejours", align: "right", value: "DFS" },
        { text: "Details", value: "detail", align: "right", sortable: false }
      ],
      destinat: [],
      editedIndex: -1,
      editedItem: {
        destination: "",
        DDS: "",
        DFS: "",
        detail: ""
      },
      defaultItem: {
        destination: "",
        DDS: "",
        DFS: ""
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1
          ? "Nouveau utilisateur"
          : "Modifier un utilisateur";
      }
    },

    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        this.destinat = [
          {
            destination: "Espagne",
            DDS: "17/10/2017",
            DFS: "1/11/2017"
          }
        ];
      },

      editItem(item) {
        this.editedIndex = this.destinat.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        const index = this.destinat.indexOf(item);
        confirm("") && this.destinat.splice(index, 1);
      }
    }
  };
</script>


<style>
  td {
    vertical-align: middle !important;
  } 
</style>