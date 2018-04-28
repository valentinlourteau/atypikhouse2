<template>
    <div>
    	<label v-if="read" class="label">{{ label }}</label>
        <div v-if="read" class="py-1 value">{{ value }}</div>
        <div v-if="!read">
        	<v-text-field v-if="type == 'string'" v-bind:value="value" @input="updateValue($event)" :label="label" :rules="rules"></v-text-field>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
        	value: "",
            read: {
                type: Boolean,
                default: "true",
                required: true,
            },
            label: {
            	type: String,
            	required: true,
            },
            type: {
            	type: String,
            	default: "string",
            	required: false,
            },
            rules: {
            	type: Array,
            	required: false,
            },
        },
        data(){
            return {
            	
            };
        },
        watch: {
        },
        mounted() {
        },

        methods: {
	       	updateValue: function (value) {
	       	   this.$emit('input', value);
	       	}
        }
    };
</script>

<style scoped>
    .label {
    	font-size: 12px;
    	line-height: 12px;
   		color: rgba(0,0,0,.54);
    }
    .value {
    	line-height: 16px;
    	font-size: 16px;
    }
</style>