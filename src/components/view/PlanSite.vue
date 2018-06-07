<template>
  <div>
    <v-container fluid sm4>
      <v-layout row wrap>
        <v-flex xs12 sm8 xl6 offset-sm2 offset-xl3>
          <v-card>
            <v-card-title>

              <h2 class="display-2"> Plan du site</h2>

            </v-card-title>
            <v-flex ml-4>
              <a href="#" color="yellow">Accueil</a>
            </v-flex>
            <h2 class="headline">Recherche d'une location</h2>
            <v-flex ml-3>
              <a href="#" style="color: black">Les destinations Atypiques</a>
              <br>
              <a href="#" style="color: black">Détails d'un bien</a>
              <br>
              <v-flex ml-4>
                <a href="#" style="color: black">Contacter le propriétaire</a>
                <br>
                <a href="#" style="color: black">Réserver un bien </a>
                <br>
                <v-flex ml-5>
                  <a href="#" style="color: black">Payement en ligne </a>
                </v-flex>
              </v-flex>
            </v-flex>
            <h2 class="headline">Mes biens en location</h2>
            <v-flex ml-3>
              <a href="#" style="color: black">Proposer un bien</a>
              <br>

              <a href="#" style="color: black">Administration d'un bien</a>
              <br>
            </v-flex>
            <v-flex ml-5>
              <a href="#" style="color: black">Gérer un planning</a>
              <br>
              <a href="#" style="color: black">Gérer photos </a>
              <br>
              <a href="#" style="color: black">Paramèteres </a>
              <br>
              <a href="#" style="color: black">Gérer les réservations</a>
            </v-flex>
            <v-flex ml-3>
              <a href="#" style="color: black">Historique des réservations</a>
            </v-flex>

            <h2 class="headline">Historique des voyages</h2>
            <v-flex ml-3>
              <a href="#" style="color: black">Commenter/noter un voyage</a>
            </v-flex>

            <h2 class="headline">Les informations concernant AtypikHouse</h2>
            <v-flex ml-3>
              <a href="#" style="color: black">Qui sommes-nous?</a>
              <br>
              <a href="#" style="color: black">Conditions générales d'utilisation</a>
              <br>
              <a href="#" style="color: black">Conditions générales de vente</a>
              <br>
              <a href="#" style="color: black">Mentions légales</a>
              <br>
              <a href="#" style="color: black">Plan du site</a>

            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer height="auto" color="primary">
      <v-layout row wrap justify-center>
        <v-btn v-for="link in links" :key="link.title" color="white" flat>
          <v-list-tile v-if="link.links == null" :to="link.link" class="black--text" active-class="yellow--text black">
            {{link.title }}
          </v-list-tile>
        </v-btn>
        <v-flex xs12 py-3 text-xs-center black--text> &copy;2018 —
          <strong>Tous droits réservés © De AtypikHouse - Réseau des hébergements insolite </strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>
<script>
  import About from "../view/About";
  export default {
    data() {
      return {
        links: [
          {
            title: "CGV",
            link: "/cgv"
          },
          {
            title: "Contact",
            link: "/contact"
          },
          {
            title: "Plan du site",
            link: "/plansite"
          },
          {
            title: "CGU",
            link: "/cgu"
          },
          {
            title: "Mentions legales",
            link: "/mentionlegale"
          }
        ]
      };
    }
  };
</script>
<style>
</style>