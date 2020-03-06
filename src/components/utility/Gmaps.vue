<template>
    <div>
    <v-text-field id="location-input" label="Adresse du bien" class="controls" type="text"
        	placeholder="Sélectionnez votre adresse" :v-validate="validator"></v-text-field>
          <div id="map" style="height:300px;"></div>
    </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
export default {
		props: {
			validator: {
	        	type: String,
	        	default: ""
	        },
		},
        methods : {
        	emitAdresse() {
        	},
        	initMap() {
				var map;
				var vue = this;
				GoogleMapsLoader.load(function(google) {
				    map = new google.maps.Map(document.getElementById('map'), {
				          center: {lat: -34.397, lng: 150.644},
				          zoom: 8
				        });
 			//	    console.log("map " + map)
				    
					var input = /** @type {!HTMLInputElement} */(
				            document.getElementById('location-input'));
 				//	console.log("input " + input)
					var autocomplete = new google.maps.places.Autocomplete(input);
 				//	console.log("autocomplete " + autocomplete)
					var infowindow = new google.maps.InfoWindow();
 				//	console.log("infowindow " + infowindow)
			        var marker = new google.maps.Marker({
			          map: map,
			          anchorPoint: new google.maps.Point(0, -29)
			        });
				//	console.log("marker " + marker)
			        
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
			            
			            //on émit l'addresse avec l'addresse, le zipcode, la ville
			            vue.$emit("onChooseAddress", place.address_components);
			            
			            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			            infowindow.open(map, marker);
			          });
					
					
 					//google.maps.event.addListener(map,'bounds_changed', function() {
 					//	console.log("listener bounds changed map : " + map)
 						//  autocomplete.bindTo(map, 'bounds');
 					//	});
			        
			        
        		});
			},
        },
    };
</script>
<style scoped>
</style>