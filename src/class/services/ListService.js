import Vue from 'vue';

class ListService {
	
	//Permet de chercher une liste de combo depuis l'api. On populate directement la référence de la liste
	static fetchList(flag, value) {
		Vue.http.get("list/" + flag).then(response => {
			if (response.status === 200) {
				var index = 0;
				response.body.list.forEach(function (item) {
					value[index] = item;
					index++;
				});
			}
		});
	}

}

export default ListService;