<template>
  <div class="flex justify-center h-full my-2">
    <div class="flex flex-wrap w-5/6 justify-content-center">
      <div class="w-full w-full rounded-sm overflow-hidden shadow-lg">
        <div class="bg-current w-full my-2">
          <p class="font-bold text-white text-2xl py-2 pl-3">PAGOS</p>
        </div>
        <ResumenCompra v-if="this.vehiculoSelected.id" :vehiculoSelected="this.vehiculoSelected" />

        <Checkout/>
      </div>
      
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Checkout from '~/components/compra/checkou.vue'
export default {

  mounted(){
    if(process.client && localStorage.getItem("vehiculoSelected")){
      this.$store.commit("setVehiculoSelected", JSON.parse(localStorage.getItem("vehiculoSelected")))
    }
  },
  computed: {
    ...mapGetters(["vehiculoSelected"]),
  },
  components: {
    Checkout
  }
};
</script>

<style>
</style>