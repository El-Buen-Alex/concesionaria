<template>
    <div v-if="mantenimientos" class="mt-5">
      <Mantenimiento v-for="mantenimiento in mantenimientos" :key="mantenimiento.id" :accesorio="mantenimiento" v-on:addOrRemoveKit="addOrRemoveKit" :tipo="'MAT'" />
  </div>
</template>

<script>
import Mantenimiento from './cards/Card-Accesorio.vue'
export default {
  mounted(){
    },
    methods:{
        addOrRemoveKit(accion, mantenimiento){
            this.$emit('addOrEditAccesorio', accion, mantenimiento, 'MAT')
        },
        
    },
    props: {
        mantenimientos:{
            required:true
        }
    },
    components: {
        Mantenimiento
    }
}
</script>