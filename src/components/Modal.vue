<template>
  
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
      	<v-form>
        <v-card-title>
          <span class="headline"><slot name="header"></slot></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <slot name="body">Default Body</slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="footer">
          	<v-btn color="blue darken-1" flat @click="$emit('close')">Close</v-btn>
          	<v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
          </slot>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  
  
  </template>
  
  <script>
  export default {
	  props: ['dialog'],
  }
  </script>
  
  <style>
  </style>