<template>
  <div>
    <v-tabs v-model="tabs" icons-and-text centered dark color="black">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        Recents
        <v-icon>phone</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        Favorites
        <v-icon>favorite</v-icon>
      </v-tab>
      <v-tab href="#tab-3">
        Nearby
        <v-icon>account_box</v-icon>
      </v-tab>
      <v-tab-item id="tab-1">
        <v-card flat>

          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex md6>
                <h2>
                  Le Bien
                </h2>
                <star-rating inline read-only :star-size="30" :increment="0.1" :show-rating="false" :active-color="tertiary"></star-rating>
              </v-flex>
              <v-flex md6>
                <h2>
                  L'ambiance
                </h2>
                <star-rating inline read-only :star-size="30" :increment="0.1" :show-rating="false" :active-color="tertiary"></star-rating>
              </v-flex>
            </v-layout>
            <v-card-title>
              <span class="title">A propos
              </span>

            </v-card-title>
          </v-container>
          <v-layout row wrap>
            <v-flex xs12 lg5 mb-6>
              <v-expansion-panel popout>

                <v-expansion-panel-content v-for="(category , i) in categories" :key="i">
                  <div slot="header">{{category.name}}</div>
                  <v-badge color="secondary" right>
                    <v-icon>{{ category.icon }}</v-icon>
                  </v-badge>

                  <v-card>
                    <v-card-text class="grey lighten-3">
                      <li v-for="(child,j) in category.children" :key="j">
                        {{child.name}}
                        <v-icon>{{ child.icon }}</v-icon>
                      </li>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex xs12 lg5 offset-lg2>
              <v-expansion-panel inset>
                <v-expansion-panel-content v-for="(item,i) in items" :key="i">
                  <div slot="header">{{item.name}}</div>

                  <v-badge color="secondary" right>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-badge>

                  <v-card>
                    <v-card-text class="grey lighten-3">
                      <li v-for="(son,j) in item.sons" :key="j">
                        {{son.name}}
                        <v-icon>{{ son.icon }}</v-icon>
                      </li>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

            </v-flex>
          </v-layout>

          <v-card-title>
            <span class="title">A propos
            </span>

          </v-card-title>
          <div id="app" style="height: 100%">
            <v-map :zoom=13 :center="[47.413220, -1.219482]">
              <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
              <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
            </v-map>
          </div>

        </v-card>

      </v-tab-item>

      <v-tab-item id="tab-2">
        <v-card flat>
          <v-card-text>This is the second tab</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="tab-3">
        <v-card flat>
          <v-card-text>This is the third tab</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script >
  import Gmaps from "../utility/Gmaps";
  import Vue from "vue";
  import GoogleMapsLoader from "google-maps";

  import FileUpload from "../utility/FileUpload";
  import StarRating from "vue-star-rating";

  export default {
    data() {
      return {
        mapLoaded: false,

        categories: [
          {
            name: "Services",
            children: [
              {
                icon: "wifi",
                name: "Wi-Fi gratuit"
              },
              {
                icon: "car",
                name: "Parking"
              },
              {
                icon: "wifi",

                name: "Parking"
              }
            ]
          },

          {
            name: "Le bien",
            children: [
              {
                name: "La cabane"
              }
            ]
          },
          {
            name: "Activites",
            children: [
              {
                name: "Sport"
              },
              {
                name: "Loisirs et detente"
              },
              {
                name: "sports nautiques"
              }
            ]
          },
          {
            name: "Spa et bien etre",

            children: [
              {
                name: "Activite"
              }
            ]
          }
        ],

        items: [
          {
            name: "Encadrement enfant",
            sons: [
              {
                icon: "wifi",
                name: "club enfant"
              },
              {
                icon: "car",
                name: "Espace te service pour les enfants"
              },
              {
                icon: "wifi",

                name: "Activité"
              }
            ]
          },

          {
            name: "Le bien",
            sons: [
              {
                name: "La cabane"
              }
            ]
          },
          {
            name: "Activites",
            sons: [
              {
                name: "Sport"
              },
              {
                name: "Loisirs et detente"
              },
              {
                name: "sports nautiques"
              }
            ]
          }
        ]
      };
    },
    components: {
      StarRating,
      Gmaps
    }
  };
</script>
<style>
</style>