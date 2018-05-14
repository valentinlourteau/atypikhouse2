/* La page sur les voyages, experiences ... */
<template>
<div>
	<div class="container">
	<v-container>
	
		<v-text-field prepend-icon="search" v-model="search" :placeholder="getRandomPlaceHolder()" solo></v-text-field>
	
		<v-layout v-if="false" row wrap>
    	<v-flex xs12 sm6 lg4 xl3 v-for="i in 9" :key="i" style="padding:16px;">
      <v-card >
        <v-card-media src="/static/images/bulle.png" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Dans ma bulle</h3>
            <div>Située dans un jardin à l'abri des regards et de toutes pollutions sonores, notre bulle vous accueille ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="blue">DETAIL</v-btn>
          <v-btn flat color="blue">DISPONIBILITES</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
	
	</div>
</div>
</template>

<script>

export default {
	methods: {
		getRandomPlaceHolder() {
			return "Une maison sous l'eau";
		},
	},
	data: function() {
		return {
			search: null,
		}
	},
	
};
</script>

<style>
</style>
