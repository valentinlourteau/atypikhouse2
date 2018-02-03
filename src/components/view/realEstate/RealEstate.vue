/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>
	<div class="container">
		
	</div>
	
	<div style="position: fixed; right: 16px; bottom: 16px;">
		<a id="addNewExperienceBtn" v-on:click="onAddNewEstate();" class="btn-floating btn-large waves-effect waves-light yellow"><i class="material-icons">add</i></a>
	</div>
</div>
</template>

<script>

export default {
	data: function() {
		return {
		}
	},
	methods: {
		onAddNewEstate() {
			this.$router.push('/realEstate/new');
		},
	},
	mounted: function() {
	},
};
</script>

<style>
</style>
