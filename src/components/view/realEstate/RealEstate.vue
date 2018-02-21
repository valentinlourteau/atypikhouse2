/* La page sur les biens atypiques dont je dispose ... */
<template>
<div>

		<v-btn v-on:click="onAddNewEstate();" fab color="primary" fixed right bottom><v-icon>add</v-icon></v-btn>
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
