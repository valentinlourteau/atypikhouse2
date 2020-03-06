<template>
  <div>
    <v-tabs v-model="active" color="yellow" dark slider-color="black" centered>
      <v-tab v-for="tab in tabs" :key="tab.text" ripple>
        <span class="black--text">{{ tab.text }}</span>
      </v-tab>   
      <v-tab-item>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
              <v-card>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field v-model="user.lastname" name="input-1" label="Mon nom"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="user.firstname" name="input-1" label="Mon prenom"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="user.email" name="input-1" label="Adresse mail"></v-text-field>
                    </v-flex>
                    <v-layout row justify-center>
                      <v-dialog v-model="showModal" persistent max-width="500px" @close="$emit('close')">
                        <v-btn slot="activator" color="primary" class="black--text" dark> Modifier mot de passe</v-btn>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Modifier le mot de passe </span>
                          </v-card-title>
                          <v-flex xs12>
                            <v-card-text>
                              <v-text-field v-model="password.old" label="Ancien mot de passe" type="password" required></v-text-field>
                              <v-text-field v-model="password.nouv" label="Nouveau mot de passe" type="password" required></v-text-field>
                              <v-text-field v-model="password.nouvConf" label="Confirmer le nouveau mot de passe" type="password" required></v-text-field>
                            </v-card-text>
                          </v-flex>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="showModal =  false">Annuler</v-btn>
                            <v-btn color="blue" flat @click="onClickValidPsw()">Valider</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-layout>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="onUpdateUser()" color="secondary" flat>Enregistrer</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout align-center>
          <v-flex xs12 sm1 text-xs-center>
            <div>
            </div>
          </v-flex>
          <v-flex xs12 sm1 text-xs-center>
            <div>
            </div>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>

import User from "../../class/entities/User";
import ReadWriteField from "../utility/ReadWriteField";
import Modal from "../Modal";
import TD from "../../class/utils/TokenDecrypter";
export default {
  components: {
    ReadWriteField
  },
  data: function() {
    return {
      showModal: false,
      user: Object.assign({}, this.$store.state.user),
      active: null,
      viewPassword: false,
      tabs: [
      { text: "Informations personnelles" }
          //        {text : "Entreprise"},
          //        {text : "Modes de payements"},
          ],
          password: {
            old: "",
            nouv: "",
            nouvConf: ""
          }
        };
      },
      methods: {
        resetProfilChanges() {
          this.user = this.$store.state.user;
          console.log(this.$store.state.user);
        },
        onUpdateUser() {
          this.$http.put("users", this.user).then(response => {
            if (response.status == 200) {
              this.$store.commit("snackbar", "Modifications effectu�es");
              this.$store.commit("onSetUser", new TD(response.body.token).data);
            }
          });
          console.log("deuxieme");
        },
        onClickValidPsw() {
          if (this.password.nouv != this.password.nouvConf) {
          //Afficher une erreur
        }
        this.$http
        .put("users/password", {
          oldPassword: this.password.old,
          newPassword: this.password.nouv
        })
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("snackbar", "Mot de passe modif�s");
          }
        });
      }
    }
  };
  </script>

  <style scoped>
  </style>