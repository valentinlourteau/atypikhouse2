<template>
<div>
 <v-card  tile class="header">
      <v-card-title class="white noir--text">
        <strong class="subheading">Nos reseaux sociaux</strong>
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          icon
          dark
          class="mx-3"
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text  class="light-green accent-2">
        <v-layout>
          <v-flex
            v-for="(col, i) in rows"
            :key="i"
            xs3
          >
            <span class="body-2" v-text="col.title.toUpperCase()"></span>
            <div
              v-for="(child, i) in col.children"
              :key="i"
              v-text="child"
            ></div>
          </v-flex>
          <v-flex xs3 layout column>
            <div>
             Une question ? Besoin d'une aide ou d'un conseil sur notre site ? Envie de vous exprimer sur un sujet particulier ? N'hesitez pas a contacter nos services.
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
    
    </v-card>

<container row wrap  >
<v-layout class="white"   >
<v-flex  sm4 ml-4 >
<v-card-title>
 <span class="title">Nous Ecrire 
 </span>
  
    </v-card-title>
 
 
 <v-text-field 
id="text"
name="input"
label="Nom"
required="required"
></v-text-field>
</v-flex>
</v-layout >
<v-layout class="white" >
<v-flex  sm4 ml-4>
<v-text-field 
id="text"
name="input"
label="Prenom"
required="required"
></v-text-field>
</v-flex>
</v-layout>
<v-layout class="white" >
<v-flex  sm4 ml-4>
<v-text-field 
id="text"
name="input"
label="Societe"

></v-text-field>
</v-flex>
</v-layout>
<v-layout class="white" >
<v-flex  sm4 ml-4>
<v-text-field 
id="text"
name="input"
label="Telephone"
required="required"
></v-text-field>
</v-flex>
</v-layout>
<v-layout class="white" >
<v-flex  sm4 ml-4>
<v-text-field 
id="text"
name="input"
label="Adresse mail"
required="required"
></v-text-field>
</v-flex>
</v-layout>

<v-layout class="white" >
<v-flex  sm4 ml-4>
<v-text-field 
id="text"
name="input"
label="Objet du mail"
type="email"
required="required"
></v-text-field>
</v-flex>
</v-layout>
<v-layout class="white" >
<v-flex  sm4 ml-4>
  <v-text-field
          name="input-7-1"
          label="Ecrivez-nous"
          multi-line
        ></v-text-field>
            <v-btn color="blue" flat >Envoyer</v-btn>
        </v-flex>
        </v-layout>
        
    

</container>

<v-footer height="auto" class="grey darken-3">
    <v-layout row wrap justify-center>
      <v-btn
        v-for="link in links"
        :key="link.title"
        color="white"
        flat
      >
            <v-list-tile v-if="link.links == null" :to="link.link">
      
                  <v-list-tile-title>{{ link.title }}</v-list-tile-title>
        </v-list-tile>
      </v-btn>
      <v-flex xs12 py-3 text-xs-center white--text>
        &copy;2018 — <strong>Tous droits réservés © De AtypikHouse - Réseau des hébergements insolite </strong>
      </v-flex>
    </v-layout>
  </v-footer>


</div>
</template>


<script>

export default {
    data: () => ({
      icons: ['fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
      rows: [
        {
          title: 'Adresse Postale',
          children: ['20 rue des orchides',' Pierrefonds- 60350 Oise'],
     

        },
        {
          title: 'Horaires',
          children: ['7j/7j', 'du 9h a 18h', 'Sauf le 1 Janvier']
        },
        {
          title: 'Nos cordonnes',
          children: ['AtypikHouse@atypik.fr', '+33 7 58 51 56 84', '+33 1 48 18 37 06']
        }
      ],
      
      
      
      links: [
          {
              title: "CGV",
              link: "/cgv",
          
              
            },
            {
              title: "Contact",
              link: "/contact"
            },
            {
              title: "Plan du site",
              link: "/input"
            },
            {
                title: "CGU",
                link: "/cgu"
              },
              {
                  title: "Mentions legales",
                  link: "/mentionlegale"
                }
          ],
    }),	
	
  }

</script>

<style>


</style>