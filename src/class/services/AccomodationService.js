import Vue from 'vue';

class AccomodationService {
	
	//Permet de chercher la liste de mes accomodations depuis l'api. On populate directement la référence de la liste
	//ne marche pas pour le v-for, voir pourquoi
	static findAll(listToPopulate) {
		Vue.http.get("accomodation").then(response => {
			if (response.status === 200) {
				var index = 0;
				response.body.accomodations.forEach(function (accomodation) {
					listToPopulate[index] = accomodation;
					index++;
				});
			}
		});
	}

}

export default AccomodationService;