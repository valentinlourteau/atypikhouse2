<template>
<div>

  <v-layout mt-4>
    <v-flex xs12 sm3 offset-sm1>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/images/utilitsateur.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Utilisateurs</span><br>
       
          </div>
        </v-card-title>
        <v-card-actions>
        
          <v-btn  flat color="orange" href="./AdUser">Acceder</v-btn>
    
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  
    <v-layout mt-4 mb-4>
    <v-flex xs12 sm3 offset-sm1>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/images//catalogue.png"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Message</span><br>
         
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Acceder</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  
   <v-layout mt-4 mb-4 >
    <v-flex xs3 sm3 offset-sm1>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/images/alert-icon.png"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Les alertes</span><br>

          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" href="./Alerte">Acceder</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>


   <v-layout mt-4 mb-4 >
    <v-flex xs3 sm3 offset-sm1>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/images/offre.png"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Offre et promotions</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Acceder</v-btn>
  
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</div>
</template>

<Script>
</Script>
<style>
</style>