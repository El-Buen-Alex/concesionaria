<template>
  <div class="flex justify-center my-5">
    <div v-if="$apollo.loading">Loading..-</div>
    <div v-else class="w-5/6">
      <div class="flex">
        <div class="w-1/2 px-3">
          <ShowProduct :vehiculoInformation="vehiculoSelected" />
        </div>
        <div class="w-1/2 px-3">
          <NuxtChild></NuxtChild>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import findVehiculoQery from "~/apollo/findVehiculoInformation";
import ShowProduct from "../../components/ShowProduct.vue";
export default {
  data() {
    return {
      id: {
        type: Number,
      },
      vehiculoimagen: [],
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
    this.getVechiuloById();
    this.activeCanPersonalizarLink();
  },
  methods: {
    getVechiuloById() {
      this.$apollo.queries.vehiculoimagen.start();
    },
    activeCanPersonalizarLink() {
      this.$store.commit("setCanPersonalice", true);
    },
    addValorVehiculoPredeterminado() {
      this.$store.commit("setVehiculoSelected", data.vehiculoimagen);
    },
   
  },
  computed: {
    ...mapGetters(["vehiculoSelected"]),
  },
  components: {
    ShowProduct,
  },
};
</script>