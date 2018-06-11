<template>
    <div style="position:relative;height:100%;">
        <agile :arrows="false" :autoplaySpeed="6000" :speed="300" :fade="true" :autoplay="true" :infinite="true" :pauseOnHover="false">
            <div class="slide" style="background-image:url(/static/images/slider/slide1.jpg);background-size:100%;">
            </div>
            <div class="slide" style="background-image:url(/static/images/slider/slide2.jpg);background-size:100%;">
            </div>
            <div class="slide" style="background-image:url(/static/images/background3.jpg);background-size:100%;">
            </div>
        </agile>
        
       	<img class="logo-ah pa-5" src="/static/images/logo-only.svg"></img>

        <div class="bloc pa-5">
        	<div class="title">
                <h1 class="display-3 white--text">Réservez votre logement atypique dans le monde entier, maintenant.</h1>
                    <v-layout class="mx-auto" row wrap>
                        <v-flex align-center xs12 class="my-3">
                            <v-text-field prepend-icon="search" v-model="search" :placeholder="getRandomPlaceHolder()" solo></v-text-field>
                        </v-flex>
                    </v-layout>
                <v-flex xs12>
                    <v-btn class="mx-auto black--text" style="display:block;" color="primary" @click="imLucky()" fab large>
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-flex>
            </div>
        </div>
    </div>
</template>

<script>
    import VueAgile from "vue-agile";
    export default {
      methods: {
        getRandomPlaceHolder() {
          var items = [
            "Paris",
            "La Rochelle",
            "Bordeaux",
            "Madrid",
            "Los Angeles",
            "Dubai"
          ];
          return items[Math.floor(Math.random() * items.length)];
        }
      },
      data: function() {
        return {
          search: null
        };
      }
    };
</script>

<style>
    .bloc {
      position: absolute;
      top: 25%;
    }
    .agile,
    .agile__track,
    .agile__list,
    .agile__slide {
      height: 100%;
    }
    .logo-ah {
    	position: absolute;
    	top: 64px;
    	left: 0;
    	width: 256px;
    	height: auto;
    	box-sizing: content-box;
    }
</style>