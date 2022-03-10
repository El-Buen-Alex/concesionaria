<template>
  <div class="w-full mt-3">
    <div class="flex justify-center">
      <select
        class="
          form-select form-select-lg
          mb-3
          block
          w-4/5
          px-4
          py-2
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-gray-800
          focus:outline-none
        "
        @change="getRoute"
        v-model="selected"
      >
        <option class="w-4/5" disabled value="-1">Select an Agency..</option>
        <option
          class="text-sm w-64"
          v-for="(concesionario, index) in this.concesionariosList"
          :key="concesionario.id"
          :value="index"
        >
          {{ concesionario.name }} - {{ concesionario.Calles }} -
          {{ concesionario.provincia.name }}
        </option>
      </select>
    </div>
    <div class="flex">
      <Map  ref="mapComponent" />
    </div>
  </div>
</template>

<script>
import Map from "./Map.vue";
import { mapGetters } from "vuex";
import directionsApi from "~/apis/MapApi";
export default {
  data() {
    return { selected: "-1" };
  },
  methods: {
    async getRoute() {
      const destino = this.concesionariosList[this.selected];
      this.$store.commit("setConcesionarioSelected", destino)
      await directionsApi
        .get(
          `${this.ubicacionUser[0]},${this.ubicacionUser[1]};${destino.longitud},${destino.latitud}`
        )
        .then((result) => {
          this.$refs.mapComponent.drawRoute(
            destino,
            result.data.routes[0].geometry.coordinates
          );
          this.$refs.mapComponent.moveMapTo(destino.longitud, destino.latitud);
        });
    },
  },
  components: {
    Map,
  },
  computed: {
    ...mapGetters(["concesionariosList", "ubicacionUser"]),
  },
};
</script>

