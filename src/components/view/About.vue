<template>
<div >

<section class="header" >

  <v-carousel>
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i" ></v-carousel-item>
  

  </v-carousel>
  </section>
	<div class="About"> 
  Qui sommes-nous?
	</div> 
	<div>
	Crée en 2018, AtypikHouse est un incontournable de la location saisonniére entre particuliers.
    AtypikHouse offre aux particuliers la possibilité de louer leur logement (maison ou appartement) a d'autres particuliers, en toute autonomie et en toute sécurité, tout en évitant les frais d'agence. Depuis sa création, de nombreux propriétaires nous font confiance pour mettre en valeur leur location vacances, et leur permettre de rentabiliser leur bien.
    </div>
            <div>
               <h2>Un site réservé au particulier</h2>
               <p>
               Exclusivement réservé aux particuliers, votre bien est mis en ligne sur notre site et diffusé a des milliers de personnes en recherche de leur future location de vacances.
               Nos forfaits s'adaptent a vos besoins en fonction des saisonnalités et du type de bien, tout est mis en oeuvre pour vous faciliter la tache et c'est toujours sans commission !
               </p>
             </div>
            <div>
                <h2>Un site réservé au professionnel</h2>
                <p>
               Un site réservé aux professionnels, votre bien est mis en ligne sur notre site et diffusé a des milliers de personnes en recherche de leur future location de vacances.
               Nos forfaits s'adaptent a vos besoins en fonction des saisonnalités et du type de bien, tout est mis en oeuvre pour vous faciliter la tache et c'est toujours sans commission !
               </p>
            </div> 
            
              <div>
                <h2>Nos Service</h2>
                <p>
                    Tout est mis en oeuvre pour vous faciliter la tache ! Nous mettons a votre disposition gratuitement des informations et des outils indispensables pour faciliter votre location :          
             </p>
             <ul class="tab">
              <li>
                   Une annonce détaillée avec jusqu'a 12 photos pour l'illustrer, de quoi donner envie aux vacanciers de séjourner chez vous.
              </li>
              <li>
                La possibilité de tenir a jour un calendrier de vos disponibilités et de vos offres promotionnelles si nécessaires              </li>
              <li>
                Vous avez meme la possibilité de recueillir les avis de vos locataires !
              </li>
              <li>
               Et nous pouvons également vous fournir des modéles de lettres ou de contrats.
              </li>
              </ul> 
               </div> 

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in linkItems" :key="item" @click="">
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      
      <v-btn @click="bonjour()">BONJOUR</v-btn>
    
</div>
</template>

<script>


export default {
    data () {
      return {
        items: [
          {
            src: '/static/images/image7.jpg'
          },
          {
            src: '/static/images/image2.jpg'
          },
          {
            src: '/static/images/image3.png'
          },
          {
            src: '/static/images/image4.jpg'
          }
          ],
          linkItems: [
        	'1', '2', '3'  
          ],
          
        }
      },
      methods : {
    	  bonjour() {
    	  },
      },
    }

  </script>


    

<style>




.company__feat .image {

height: 330px;
}
.u-tableRow {
position:relative;
display:table;
width:100%;
height:100%;
z-index:95;

}
.header{
padding:0;


}
.carousel
{
    visibility: visible;
    color: #FFF;
    font-size: 18px;
    line-height: 1.4;
    position: relative;
  font-family: HelveticaNeue-Medium,Helvetica Neue,Arial;
    font-weight: 400;
    text-align: left;
}
.About{
color:#23ACB6!important;
font-weight: 700;
font-size: 55px;
line-height: 1em;
margin-top: 20px;
margin-bottom: 10px;
font-family: Bradley Hand, cursive;
}
h2 {
font-family: "Open Sans", Arial, Verdana, sans-serif;
color: #F16B22;
font-size: 1.3em;
margin: 25px 0 15px;
  }
ul.tab li{
padding: 1px 0 4px 20px;
}
    
</style>
