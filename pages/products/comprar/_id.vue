<template>
  <div class="flex justify-center mt-3">
    <div class="flex flex-wrap w-5/6">
      <div class="w-full sm:w-2/3">

      </div>
       <div class="w-full md:w-1/3">
        <ResumenCompra :vehiculoSelected="this.vehiculoSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["vehiculoSelected"]),
  },
};
</script>

<style>
</style>