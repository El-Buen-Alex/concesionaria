<template>
  
  <div v-if="this.$route.query.canceled" class="w-5/6">
    <div v-if="this.$route.query.canceled=='true'" class="flex flex-wrap justify-center w-full">
      <div class=" w-full lg:w-1/2 flex justify-center"> <img class="h-auto w-auto max-w-60 max-h-60" src='../../static/cancel.png'/></div>
      <div class=" w-full lg:w-1/2"> 
        <h1 class="font-bold text-2xl">Lamentamos que hayas cancelado la compra</h1>
        <p>A continuacion puedes <NuxtLink :to="`/products/resumen/${vehiculoSelected.id}`" class="underline text-blue-600">Intentar comprar nuevamente</NuxtLink> o volver a <NuxtLink to='/' class="underline text-blue-600">Elegir un vehiculo</NuxtLink>  y personalizarlo </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    console.log(this.$route.query.canceled)
  },
  computed:{
     ...mapGetters(["vehiculoSelected"]),
  }
}
</script>

<style>

</style>