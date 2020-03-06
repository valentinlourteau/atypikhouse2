<template>
  <div>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl8>
          <v-card>
            <v-card-title>
              <span class="headline">Paramètres de listes</span>
            </v-card-title>

            <v-menu offset-y>
             
              <v-text-field class="ml-3" slot="activator" label="Catégorie" v-model="selectedFlag"></v-text-field>
              <v-list>
                <v-list-tile v-for="(flag, index) in flags" :key="index" @click="onChangeFlag(flag)">
                  <v-list-tile-title>{{ flag }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

          
            <v-data-table :headers="headers" :items="listItems" item-key="_id" hide-actions>
              <template slot="items" slot-scope="props">
                <td @click="onSelectType(props.item)" style="line-height:48px;">{{ props.item.frname }}</td>
                <td @click="onSelectType(props.item)" style="line-height:48px;">{{ props.item.enname }}</td>
                <td @click="onSelectType(props.item)" style="line-height:48px;">{{ props.item.category }}</td>
              </template>
            </v-data-table>

            <v-btn @click="dialog = true;" color="secondary" flat>Ajouter</v-btn>

          </v-card>
        </v-flex>
  
        <!-- La card des features (aka champs dynamiques) -->
        <v-flex xs12 sm4 xl4>

          <v-card>
            <v-card-title>Champs personnalisés</v-card-title>
            <v-card-text>
            
              <v-alert :value="selectedFlag != 'accomodationTypes'" type="info">Veuillez sélectionnez la catégorie 'accomodationTypes' pour ajouter des champs de saisie pour les différents types de bien</v-alert>
              <v-alert :value="selectedFlag == 'accomodationTypes' && selectedType == null" type="info">Veuillez sélectionner un type de bien pour pouvoir y ajouter des champs</v-alert>
              <div v-if="selectedFlag == 'accomodationTypes' && selectedType != null">
                <div class="text-xs-center">
                  <v-chip>{{selectedType.frname}}</v-chip>
                </div>
              </div>
            </v-card-text>
            <v-card-actions v-if="selectedFlag == 'accomodationTypes' && selectedType != null">
              <v-btn @click="onInitAddNewFeature()" color="secondary" flat>AJOUTER</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

      </v-layout>
    </v-container>

    <v-dialog v-model="featureDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">{{ selectedFeature._id == null ? 'Ajouter un champs de saisie' : 'Editer un champs de saisie'}}</div>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="selectedFeature.name" label="Nom du champ"></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-text-field v-model="selectedFeature.icon" label="Icone"></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-icon class="black--text">{{ selectedFeature.icon }}</v-icon>
              </v-flex>

              <v-flex xs12>
                <v-menu offset-y>
                  <v-text-field slot="activator" label="Type de valeur" v-model="selectedFeature.type"></v-text-field>
                  <v-list>
                    <v-list-tile v-for="(type, index) in ['number', 'date', 'string']" :key="index" @click="selectedFeature.type = type">
                      <v-list-tile-title>{{ type }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="featureDialog = false;">Annuler</v-btn>
          <v-btn color="secondary" flat @click.native="onSaveFeature()">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <div class="d-block headline">{{ selectedItem._id == null ? 'Ajouter un élément' : 'Editer un élément'}} : {{ selectedFlag }}</div>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selectedItem.frname" label="Nom français"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selectedItem.enname" label="Nom anglais"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="dialog = false;">Annuler</v-btn>
          <v-btn color="secondary" flat @click.native="onAddItem()">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  export default {
    created: function() {
      this.$http.get("list").then(response => {
        if (response.status == 200) {
          this.flags = response.body.lists;
          this.onChangeFlag(this.flags[0]);
        }
      });
    },

    data: function() {
      return {
        dialog: false,
        selectedItem: {
          _id: null,
          enname: "",
          frname: ""
        },
        selectedFlag: null,
        flags: [],
        listItems: [],
        headers: [
          { text: "Nom français", value: "frname" },
          { text: "Nom anglais", value: "enname" },
          { text: "Catégorie", value: "category" }
        ],
        selectedType: null,
        featureDialog: false,
        features: [],
        selectedFeature: {
          type: "",
          icon: "",
          name: "",
          accomodationtype: null
        }
   
      };
    },

    methods: {
      onChangeFlag(flag) {
        var vue = this;
        this.selectedFlag = flag;
        this.$http.get("list/" + flag).then(response => {
          if (response.status == 200) {
            this.listItems.length = 0;
            response.body.list.forEach(function(element) {
              vue.listItems.push(element);
            });
          }
        });
      },
      //ajout d'un nouvel élément
      onAddItem() {
        this.selectedItem.category = this.selectedFlag;
        this.dialog = false;
        this.$http.post("list", this.selectedItem).then(response => {
          if (response.status == 200) {
            this.listItems.push(response.body.element);
            this.$store.commit("snackbar", "Element ajouté à la liste");
          }
        });
      },
      onDeleteItem() {},
      onEditItem() {},
      onInitAddNewFeature() {
        this.selectedFeature.type = "";
        this.selectedFeature.icon = "";
        this.selectedFeature.name = "";
        this.selectedFeature.accomodationtype = this.selectedType._id;
        this.featureDialog = true;
      },
      onSaveFeature() {
        this.$http.post("feature", this.selectedFeature).then(response => {
          if (response.status == 200) {
            this.features.push(response.body.savedFeature);
            this.$store.commit("snackbar", "Feature enregistrée");
          }
        })
      },
      onSelectType(type) {
        this.selectedType = type;
      }
    }
  };
</script>
<style>
</style>