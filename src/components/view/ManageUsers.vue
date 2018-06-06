<template>
<div>

<v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
          <v-card>
            <v-card-title>
                <span class="headline">Gestion des utilisateurs</span>
            </v-card-title>
    <v-data-table
      :headers="headers"
      :items="aduser"
      hide-actions 
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.firstname }}</td>
        <td>{{ props.item.lastname }}</td>
        <td>{{ props.item.addmail }}</td>
        <td>
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
        
      </template>
       
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

          </v-card>
        </v-flex></v-layout></v-container>

        
   <v-btn @click="dialog = true;" color="yellow" fab fixed right bottom>
 <v-icon>add</v-icon>
 </v-btn>

 <v-dialog v-model="dialog" persistent max-width="500px">
   <v-card>
     <v-card-title>
      <span class="headline">{{formTitle}}</span>
    </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="editedItem.firstname" label="Prenom"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.lastname" label="Nom de famille"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.addmail" label="Adresse e-mail"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.password" label="Mot de passe"></v-text-field>
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
      { text: "First Name", value: "firstname" },
      { text: "Last Name", value: "lastname" },
      { text: "Adresse e-mail", value: "Addmail" },
      { text: "Actions", value: "name", sortable: false }
    ],
    aduser: [],
    editedIndex: -1,
    editedItem: {
      firstname: "",
      lastname: "",
      addmail: "",
      matricule: "",
      poste: ""
    },
    defaultItem: {
      firstname: "",
      lastname: "",
      addmail: "",
      matricule: "",
      poste: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvel utilisateur"
        : "Modifier un utilisateur";
    }
  },

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
      this.aduser = [
        {
          firstname: "Hammami",
          lastname: "mohamed",
          addmail: "hammamimedamine02@gmail.com"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.aduser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.aduser.indexOf(item);
      confirm("") && this.aduser.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.aduser[this.editedIndex], this.editedItem);
      } else {
        this.aduser.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>


<style>
td {
   vertical-align: middle !important;
}

</style>