<template>
<div class="blue-grey">


	<div id="account-bg">

		<div class="row">

			<div class="col m8 offset-m1">

				<div>
					<div id="resume" class="card scrollspy darken-1">
						<div class="card-content white-text">
							<span class="card-title blue-grey-text">Résumé</span>
							<p class="black-text">Un résumé sur l'utilisateur, nombre de logements en location, nombre de voyages fait, pourquoi pas un total de point pour définir un niveau de
								popularité sur le site. Temps de connexion, ancienneté, nombre de visiteurs acceuillis</p>
						</div>
					</div>
				</div>

				<div>
					<div id="profil" class="card scrollspy darken-1">
						<div class="card-content white-text">
							<span class="card-title blue-grey-text">Profil</span>
							<p>Vous pouvez éditer ici vos informations personnelles.</p>
							<form>
								<div class="row">
									<div class="input-field col s6">
										<input id="first_name" type="text" v-model="user.prenom"> <label for="first_name">Prenom</label>
									</div>
									<div class="input-field col s6">
										<input id="last_name" type="text" v-model="user.nom"> <label for="last_name">Nom</label>
									</div>
									<div class="input-field col s12">
										<input id="email" type="text" v-model="user.email"> <label for="email">Email</label>
									</div>
								</div>
							</form>
						</div>
						<div class="card-action">
							<a v-on:click="resetProfilChanges();">Annuler</a> <a href="#">Enregistrer</a>
						</div>
					</div>
				</div>

				<div>
					<div id="photos" class="card scrollspy darken-1">
						<div class="card-content white-text">
							<span class="card-title blue-grey-text">Photos</span>
							<p>Vous pouvez choisir ici votre photo de profil. Une photo de profil claire sera un premier pas pour des échances fructueuses avec les autres utilisateurs ! Souriez !</p>
						</div>
						<div class="card-action">
							<a href="#">This is a link</a> <a href="#">This is a link</a>
						</div>
					</div>
				</div>

				<div>
					<div id="confidentialite" class="card scrollspy darken-1">
						<div class="card-content white-text">
							<span class="card-title blue-grey-text">Confidentialité</span>
							<p>Vous pouvez ici choisir ici la manière dont vos données sont accessibles, notament auprès des autres utilisateurs</p>
						</div>
						<div class="card-action">
							<a href="#">This is a link</a> <a href="#">This is a link</a>
						</div>
					</div>
				</div>

			</div>

			<div style="position: fixed; right: 0;" class="col hide-on-med-and-down m2">
				<ul class="section table-of-contents">
					<li><a href="#resume"><span class="white-text">Résumé</span></a></li>
					<li><a href="#profil"><span class="white-text">Profil</span></a></li>
					<li><a href="#photos"><span class="white-text">Photos</span></a></li>
					<li><a href="#confidentialite"><span class="white-text">Confidentialité</span></a></li>
				</ul>
			</div>

		</div>

	</div>

</div>
</template>

<script>
import User from '../../class/entities/User';

export default {
	data: function() {
		return {
			user: Object.assign({}, this.$store.state.user),
		}
	},
	methods: {
		resetProfilChanges() {
			this.user = this.$store.state.user;
			console.log(this.$store.state.user);
		}
	}
};
</script>

<style scoped>
#account-bg {
background-color: #0d47a1;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232196f3' fill-opacity='1'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
