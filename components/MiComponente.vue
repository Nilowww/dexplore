<template>
    <p>{{ type }}</p>
    <input v-model="valor1"/> {{ valor1 }} <br>
    <input v-model="valor2"/> {{ valor2 }} <br>
    <p>{{ resultado }}</p>
    <hr> 
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        max?: number
        type: string
    }>(), {
        max: 100,
        type: 'add'
    });

    const valor1 = ref(Math.round(Math.random() * 100))
    const valor2 = ref(Math.round(Math.random() * 100))
    
    const resultado = computed (() => {
        let result = 0;
        if (props.type == 'add') {
            result = parseInt(valor1.value.toString()) + parseInt(valor2.value.toString());
        } else if (props.type == 'multiply') {
            result = parseInt(valor1.value.toString()) * parseInt(valor2.value.toString());
        } else if (props.type == 'substraction') {
            result = parseInt(valor1.value.toString()) - parseInt(valor2.value.toString());
        } else if (props.type == 'division') {
            result = parseInt(valor1.value.toString()) / parseInt(valor2.value.toString());
        }
        if (result > props.max) {
            return 'Error';
        }
        return result;
    })
    console.log(resultado)
</script> 