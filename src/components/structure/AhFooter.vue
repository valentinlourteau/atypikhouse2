<template> 
<div>
	<v-bottom-nav class="hidden-md-and-up" :value="true" absolute color="yellow">
      <v-btn to="discover" flat color="black">
        <span>Voyager</span>
        <v-icon>flight</v-icon>
      </v-btn>
      <v-btn to="about" flat value="black">
        <span>A propos</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
</div>
</template>

<script type="text/javascript">

export default {
};

</script>

<style>

</style>
