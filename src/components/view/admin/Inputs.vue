<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
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

            <v-data-table
                :headers="headers"
                :items="listItems"
                item-key="_id"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td style="line-height:48px;">{{ props.item.frname }}</td>
                <td style="line-height:48px;">{{ props.item.enname }}</td>
                <td style="line-height:48px;">{{ props.item.category }}</td>
                </template>
            </v-data-table>

            <v-btn @click="dialog = true;" color="secondary" flat>Ajouter</v-btn>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
      ]
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
    onEditItem() {}
  }
};
</script>
<style>
</style>
