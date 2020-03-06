<template>
<div>


<v-container fluid> 
 <v-flex xs12>
 <v-card>
 <v-card-title>
 <span class="title">Utilisateurs  
 </span>
  
    </v-card-title>
    </v-card>
    </v-flex>
</v-container>
 <v-dialog v-model="dialog">
   <v-btn slot="activator"  fab dark dark class="mb-4">
 <v-icon>add</v-icon>
 </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.firstname" label="firstName "></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.lastname" label="lastname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.addmail" label="Adresse e-mail"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.maticule" label="Matricule"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.poste" label="Poste"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Annuler</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="aduser"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.firstname }}</td>
        <td class="text-xs-right">{{ props.item.lastname }}</td>
        <td class="text-xs-right">{{ props.item.addmail }}</td>
        <td class="text-xs-right">{{ props.item.matricule }}</td>
        <td class="text-xs-right">{{ props.item.poste }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
        
      </template>
       
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
 
  </div>
</template>
<script>
 export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'First Name',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Adresse e-mail', value: 'Addmail' },
        { text: 'Matricule', value: 'matricule' },
        { text: 'Poste', value: 'poste' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      aduser: [],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        addmail: '',
        matricule: '',
        poste: ''
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        addmail: '',
        matricule: '',
        poste:''
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nouveau utilisateur' : 'Modifier un utilisateur'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
        initialize () {
          this.aduser = [
                                
            
            {
            	 firstname: 'Hammami',
                 lastname: 'mohamed',
                 addmail:'hammamimedamine02@gmail.com',
                 matricule: '2810',
                 poste: '1'
            }
          ]
        },
      editItem (item) {
        this.editedIndex = this.aduser.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.aduser.indexOf(item)
        confirm('') && this.aduser.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.aduser[this.editedIndex], this.editedItem)
        } else {
          this.aduser.push(this.editedItem)
        }
        this.close()
      }
 }
  }
</script>


<style>
</style>

