<template>
  <div class="flex justify-center mt-3">
    <div class="flex flex-wrap w-5/6" v-if="vehiculoSelected.id">
      <div class="w-full lg:w-1/2 mb-3 px-1">
        <ResumenCompra :vehiculoSelected="this.vehiculoSelected" />
      </div>
      <div class="w-full lg:w-1/2 mb-3 px-1">
        <h1 class="text-white bg-gray-700 rounded-sm text-center font-bold text-2xl">
          ECOGE UN CONCESIONARIO
        </h1>
        <Concesionarios
          v-if="this.concesionariosList.length > 0"
          :concesionarios="this.concesionariosList"
        />
        <div class="w-full flex mt-5">
          <div class="w-1/3 px-1">
            <button @click="$router.go(-1)" class="w-full bg-red-600">
              >Atras
            </button>
          </div>
          <div class="w-2/3 px-2">
            <button class="w-full bg-green-600" @click="goToComprar()">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concesionarios from "~/components/Resumen/Concesionarios.vue";
import { mapGetters } from "vuex";
import GetConcesionarios from "~/apollo/GetConcesionarios";
import ResumenCompra from "~/components/Resumen/ResumenCompra.vue";
export default {
  mounted() {},
  created() {
    if (process.client) {
      if (
        !this.vehiculoSelected.id &&
        localStorage.getItem("vehiculoSelected")
      ) {
        this.$store.commit(
          "setVehiculoSelected",
          JSON.parse(localStorage.getItem("vehiculoSelected"))
        );
      }
    }
  },
  methods: {
    goToComprar() {
      if (this.concesionarioSelected.id) {
        this.$router.push(`/products/comprar/${this.$route.params.id}`);
      }
    },
  },
  apollo: {
    concesionarios: {
      prefetch: false,
      query: GetConcesionarios,
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setConcesionarios", data.concesionarios);
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      "vehiculoSelected",
      "concesionariosList",
      "concesionarioSelected",
    ]),
    RouteServer() {
      return process.env.baseUrl;
    },
  },
  components: {
    Concesionarios,
    ResumenCompra,
  },
};
</script>

<style>
</style>