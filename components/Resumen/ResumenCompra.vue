<template>
  <div class="w-full">
    <img
      class="w-full max-h-full"
      :src="RouteServer + vehiculoSelected.url_imagen.url"
      alt="vehiculo Seleccionado"
    />
    <div>
      <h1 class="text-white bg-gray-800 text-center font-bold text-2xl">
        RESUMEN
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vehiculoSelected: {
      type: Object,
      required: true,
    },
  },
  computed: {
    RouteServer() {
      return process.env.baseUrl;
    },
  },
};
</script>

<style>
</style>