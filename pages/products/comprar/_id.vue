<template>
  <div class="flex justify-center h-full">
    <div class="flex flex-wrap w-5/6">
      <div class="w-full sm:w-2/3 px-5">
        <Checkout/>
      </div>
       <div class="w-full md:w-1/3">
        <ResumenCompra v-if="this.vehiculoSelected.id" :vehiculoSelected="this.vehiculoSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Checkout from '~/components/compra/checkou.vue'
export default {

  mounted(){
    if(process.client && !this.vehiculoSelected.id){
      this.$store.commit("setVehiculoSelected", JSON.parse(localStorage.getItem("vehiculoSelected") || {}))
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