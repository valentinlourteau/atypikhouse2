<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm12 xl6 offset-xl3>
          <v-card>
            <v-card-title>
              <span class="headline">Gestion des utilisateurs</span>
            </v-card-title>
            <v-data-table :headers="headers" :items="users" hide-actions>
              <template slot="items" slot-scope="props">
                <td>{{ props.item.firstname }}</td>
                <td>{{ props.item.lastname }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.admin }}</td>
                <td>
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn @click="dialog = true;" color="yellow" fab fixed right bottom>
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edition d'un utilisateur</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="editedItem.firstname" label="Prenom"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.lastname" label="Nom"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.email" label="Adresse e-mail"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-checkbox v-model="editedItem.admin" label="Admin ?"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="close">Annuler</v-btn>
          <v-btn color="secondary" flat @click.native="save">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: "Prenom", value: "firstname" },
        { text: "nom", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Admin", value: "admin" },
        { text: "Actions", value: "actions" }
      ],
      users: [],
      editedItem: {
        firstname: "",
        lastname: "",
        email: ""
      },
      defaultItem: {
        firstname: "",
        lastname: "",
        email: ""
      }
    }),
    computed: {},
    watch: {
      dialog(val) {
        val || this.close();
      }
    },
    created() {
      this.initialize();
    },
    methods: {
      initialize() {
        this.$http.get("users/findAll").then(response => {
          if (response.status == 200) {
            this.users = response.body.users;
          }
        });
      },
      editItem(item) {
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = this.defaultItem;
        }, 300);
      },
      save() {
        var vue = this;
        console.log(this.editedItem)
        this.$http.put("users/any/" + this.editedItem._id, this.editedItem).then(response => {
          if (response.status == 200) {
            this.$store.commit("snackbar", "Utilisateur modifié");
            this.close();
            vue.$http.get("users/findAll").then(response => {
              if (response.status == 200) {
                vue.users = response.body.users;
              }
            });
          }
        });
      }
    }
  };
</script>
<style>
  td {
    vertical-align: middle !important;
  }
</style>