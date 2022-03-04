<template>
    <div v-if="individuales" class="mt-5">
      <Individual v-for="individual in individuales" :key="individual.id" :accesorio="individual" v-on:addOrRemoveKit="addOrRemoveKit" :tipo="'IND'" />
  </div>
</template>

<script>
import Individual from './cards/Card-Accesorio.vue'
export default {
  mounted(){
    },
    methods:{
        addOrRemoveKit(accion, individual){
            this.$emit('addOrEditAccesorio', accion, individual, 'IND')
        },
        
    },
    props: {
        individuales:{
            required:true
        }
    },
    components: {
        Individual
    }
}
</script>

