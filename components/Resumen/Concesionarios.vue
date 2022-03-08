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
      >
        <option class="w-4/5" selected disabled>Select an Agency..</option>
        <option class="text-sm w-64"  v-for="concesionario in this.concesionariosList" :key="concesionario.id" :value="concesionario.id">{{concesionario.name}} - {{concesionario.Calles}} - {{concesionario.provincia.name}}</option>
      </select>
    </div>
    <div class="flex">
        <Map />
    </div>
  </div>
</template>

<script>
import Map from './Map.vue'
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
      Map
  },
  computed:{
     ...mapGetters(["concesionariosList"]),
  }
};
</script>

