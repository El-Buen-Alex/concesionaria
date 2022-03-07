<template>
  <div  class="flex  justify-center mt-3">
    <div class="flex flex-wrap w-5/6 " v-if="vehiculoSelected.id">
      <div class="w-full sm:w-1/2 mb-3  px-1">
        <img class="w-full max-h-full" :src="RouteServer+vehiculoSelected.url_imagen.url" alt="vehiculo Seleccionado">
        <div>
           <h1 class="text-white bg-gray-800 text-center font-bold text-2xl">RESUMEN</h1>
        </div>
      </div>
      <div class="w-full sm:w-1/2 mb-3 px-1">
           <h1 class="text-white bg-gray-800 text-center font-bold text-2xl">ECOGE UN CONCESIONARIO</h1>
           <Concesionarios />
      </div>
  </div>
  </div>
</template>

<script>
import Concesionarios from '~/components/Resumen/Concesionarios.vue'
import { mapGetters } from "vuex";
export default {
  mounted() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords);
    });
  },
  created() {
    if(process.client){
      if(!this.vehiculoSelected.id && localStorage.getItem("vehiculoSelected")){
        this.$store.commit("setVehiculoSelected", JSON.parse(localStorage.getItem("vehiculoSelected")))
      }
    }
  },
  computed: {
    ...mapGetters(["vehiculoSelected"]),
    RouteServer() {
      return process.env.baseUrl;
    },
  },
  components:{
    Concesionarios
  }
};
</script>

<style>
</style>