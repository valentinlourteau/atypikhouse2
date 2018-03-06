/* La page de cr�ation d'un nouveau bien ... */
<template>
<div>
	<div class="container">
		
		 <v-stepper v-model="stepIndex">
		 
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepIndex > 1" editable>Préambule</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepIndex > 2" editable>Pour démarrer</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="stepIndex > 3" editable>L'essentiel</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="stepIndex > 4" editable>Equipements</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete="stepIndex > 5" editable>Espaces accessibles</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6" :complete="stepIndex > 6" editable>Avant de finir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7" :complete="stepIndex > 7" editable>Le mot de la fin</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="8" :complete="stepIndex > 8" editable>Pour accueillir</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="9" :complete="stepIndex > 9" editable>Réglement</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="10" :complete="stepIndex > 10" editable>Qui peut réserver ?</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="11" :complete="stepIndex > 11" editable>Calendrier</v-stepper-step>
      </v-stepper-header>
      
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px">
          	<p>Ici, quelques infos du site sur l'int�r�t et les engagements relatifs � la publication d'un h�bergement. le fait que chaque �tape valid�e enregistre la r�servation pour la continuer plus tard si besoin
          	est</p>
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 2;initMap();">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-5">
          
          
          <v-text-field id="location-input" label="Adresse du bien" class="controls" type="text"
        	placeholder="Sélectionnez votre adresse"></v-text-field>
          <div id="map" style="height:300px;"></div>
          
          </br>
          
          <v-text-field label="Appartement, b�timent, r�sidence (facultatif)" v-model="accomodation.complementAdresse"></v-text-field>
              
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-5">Quelques informations essentielles, le nombre de voyageurs possible, nombre et configuration des lits
          
          <!-- Type de bien -->
          <v-select :items="typeOfAccomodationList" v-model="accomodation.type" label="Type de bien" multi-line bottom></v-select>
          
          <v-layout row wrap>
          
          <!-- Capacité d'accueil -->
          <v-flex xs12>
          <v-subheader>Capacité d'accueil</v-subheader>
          </v-flex>
          
          <v-flex xs9>
         <v-slider v-model="accomodation.maximumPeopleCount" min="1" max="20"></v-slider>
         </v-flex>
         <v-flex xs3>
            <v-text-field v-model="accomodation.maximumPeopleCount" type="number"></v-text-field>
          </v-flex>
         
         <!-- Nombre de lits -->
         <v-flex xs12>
         	<v-subheader>Nombre de couchages</v-subheader>
         </v-flex>
         <v-flex xs9>
         	<v-slider v-model="accomodation.numberOfBeds" min="1" max="20" xs9></v-slider>
         </v-flex>
          <v-flex xs3>
            <v-text-field v-model="accomodation.numberOfBeds" type="number"></v-text-field>
          </v-flex>
          
          </v-layout>
          
          </v-card>
     
          <v-btn color="primary" @click.native="stepIndex = 4">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-5" >La liste des �quipements propos�s par le bien
          
          
          
          
          
          
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 5">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-card color="grey lighten-1" class="mb-5" height="200px">L'ensemble des espaces disponibles pour l'utilisateur au sein de la propri�t�, jardin, cuisine, jaccuzi, etc ..</v-card>
          <v-btn color="primary" @click.native="stepIndex = 6">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="6">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Donner une description personnalis�e, du bien, ce qui le rend atypique, 
          ajouter des photos avec l�gendes, d�finir la photo qui sera m�ise en avant sur la pubnlications. Le titre de l'annonce</v-card>
          <v-btn color="primary" @click.native="stepIndex = 7">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="7">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Ici, le titre de l'annonce, et �ventuellement des mots cl�s fournis par le site pour classer l'annonce, � voir pour cette partie :
          'en famille', 'en amoureux', 'nature', 'd�paysement'</v-card>
          <v-btn color="primary" @click.native="stepIndex = 8">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="8">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications g�n�rales (explications plus pr�cises sur les pages concern�es) sur la tarification, calendrier, comment accueillir le visiteur. Explications sur les obligations � remplir par
          le visiteur pour pouvoir louer le bien, typiquement num�ro de t�l�phone v�rifi�, informations de payement, carte d'identit�... Possiblit� d'ajotuer des contrainte suppl�mentaires, ID, Recommandations ..
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 9">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="9">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Quelles r�gles appliquer, adapt� aux b�b�s, fumeur ... Et �galement les infos � connaitre sur le logement ,zone inondable, animaux dangereux, armes etc
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 10">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="10">
          <v-card color="grey lighten-1" class="mb-5" height="200px">R�capitulatif sur qui peut r�server et comment, infos en plus...
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 11">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
         <v-stepper-content step="11">
          <v-card color="grey lighten-1" class="mb-5" height="200px">Explications d�taill�es sur le calendrier
          </v-card>
          <v-btn color="primary" @click.native="stepIndex = 12">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
      
    </v-stepper>
    
    <!-- Chaque step peut disposer d'une v-card d'aide, d'informations suppl�mentaires, voir airbnb -->
		
		
	</div>
	
</div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import Accomodation from '../../../class/entities/accomodation';

export default {
	data: function() {
		return {
			accomodation : new Accomodation(),
			stepIndex: 4,
			typeOfAccomodationList: [
				{text:"dick"},
				{text:"zizi"},
			],
			goodsAvailableForGuestList: [
				{text:"douche"},
				{text:"animaux accept�s"},
			],
		}
	},
	methods: {
		initMap() {
				var map;
				GoogleMapsLoader.load(function(google) {
				    map = new google.maps.Map(document.getElementById('map'), {
				          center: {lat: -34.397, lng: 150.644},
				          zoom: 8
				        });
				    console.log("map " + map)
				    
					var input = /** @type {!HTMLInputElement} */(
				            document.getElementById('location-input'));
					console.log("input " + input)
					var autocomplete = new google.maps.places.Autocomplete(input);
					console.log("autocomplete " + autocomplete)

					var infowindow = new google.maps.InfoWindow();
					console.log("infowindow " + infowindow)

			        var marker = new google.maps.Marker({
			          map: map,
			          anchorPoint: new google.maps.Point(0, -29)
			        });
					console.log("marker " + marker)
			        
			        autocomplete.addListener('place_changed', function() {
			            infowindow.close();
			            marker.setVisible(false);
			            var place = autocomplete.getPlace();
			            if (!place.geometry) {
			              // User entered the name of a Place that was not suggested and
			              // pressed the Enter key, or the Place Details request failed.
			              window.alert("No details available for input: '" + place.name + "'");
			              return;
			            }

			            // If the place has a geometry, then present it on a map.
			            if (place.geometry.viewport) {
			              map.fitBounds(place.geometry.viewport);
			            } else {
			              map.setCenter(place.geometry.location);
			              map.setZoom(17);  // Why 17? Because it looks good.
			            }
			            marker.setIcon(/** @type {google.maps.Icon} */({
			              url: place.icon,
			              size: new google.maps.Size(71, 71),
			              origin: new google.maps.Point(0, 0),
			              anchor: new google.maps.Point(17, 34),
			              scaledSize: new google.maps.Size(35, 35)
			            }));
			            marker.setPosition(place.geometry.location);
			            marker.setVisible(true);

			            var address = '';
			            if (place.address_components) {
			              address = [
			                (place.address_components[0] && place.address_components[0].short_name || ''),
			                (place.address_components[1] && place.address_components[1].short_name || ''),
			                (place.address_components[2] && place.address_components[2].short_name || '')
			              ].join(' ');
			            }

			            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			            infowindow.open(map, marker);
			          });
					
// 					google.maps.event.addListener(map,'bounds_changed', function() {
// 						console.log("listener bounds changed map : " + map)
// 						  autocomplete.bindTo(map, 'bounds');
// 						});
			        
			        
				});
		},
	},
};
</script>

<style>
#location-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 300px;
      }
</style>
