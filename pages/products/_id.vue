<template>
  <div class="flex justify-center my-5">
    <div v-if="$apollo.loading">Loading..-</div>
    <div v-else class="w-5/6">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 px-3">
          <ShowProduct />
        </div>
        <div class=" w-full lg:w-1/2 px-3 mt-3 lg:mt-0">
          <NuxtChild v-if="isStarProcess"></NuxtChild>
          <div v-else>
            <div v-if="vehiculoimagen.id">
              <h1 class="text-center text-2xl font-bold">DESCRIPCION</h1>
              <p class="text-xl">
                {{ vehiculoimagen.vehiculoanio.vehiculo.detalle }}
              </p>
              <Navigation v-on:prev="$router.go(-1)" v-on:next="startProcessCompra"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import findVehiculoQery from "~/apollo/findVehiculoInformation";
import ShowProduct from "../../components/ShowProduct.vue";
import Navigation from '~/components/shared/Navigation.vue'
export default {
  data() {
    return {
      id: {
        type: Number,
      },
      vehiculoimagen: [],
      inicio_proceso_compra: false,
    };
  },
  apollo: {
    vehiculoimagen: {
      prefetch: false,
      query: findVehiculoQery,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setVehiculoSelected", data.vehiculoimagen);
        }
      },
    },
  },
  created() {
   // this.activeCanPersonalizarLink();
  },
  mounted() {
    this.getStateProcesoCompra();
  },

  methods: {
    async getStateProcesoCompra() {
      if (process.client) {
        const estado=await localStorage.getItem("startProcess")
        console.log(estado)
        await this.$store.commit(
          "setStartProcess",
            JSON.parse(estado)
        );
        if (this.$route.name == "products-id" && this.isStarProcess==true) {
          this.$router.push(
            `/products/${this.$route.params.id}/personalizar/main`
          );
        }
      }
    },
    activeCanPersonalizarLink() {
      this.$store.commit("setCanPersonalice", true);
    },
    startProcessCompra() {
      this.$store.commit("setStartProcess", true);
      localStorage.setItem("startProcess", true);
      this.$router.push(`/products/${this.$route.params.id}/personalizar/main`);
    },
  },
  computed: {
    ...mapGetters(["vehiculoSelected", "startProcess"]),
    isStarProcess() {
      return this.startProcess;
    },
  },
  components: {
    ShowProduct,
    Navigation
  },
};
</script>