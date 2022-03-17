<template>
  <div v-if="this.vehiculoSelected.id">
    <div>
      <h1 class="text-5xl text-center bg-black text-white p-2 rounded-sm">
        {{ vehiculoSelected.vehiculoanio.vehiculo.modelo }}
      </h1>
    </div>
    <div class="w-full">
      <div class="w-full">
        <img
          :src=" url_previe_img"
          alt="preview_del_vehiculo"
          class="w-full"
        />
      </div>
      <div class="flex">
        <!-- OJO -->
        <button
          class="w-1/3"
          v-for="vehiculoimagen in vehiculoImagenesSelected"
          :key="vehiculoimagen.id"
        >
          <input
            type="radio"
            :id="vehiculoimagen.id"
            name="drone"
            @click="refreshPreview(vehiculoimagen)"
            :checked="vehiculoimagen.id == vehiculoSelected.id ? true : ''"
          />
          <img
            :src=" vehiculoimagen.url_imagen.url"
            :alt="vehiculoimagen.vehiculoanio.vehiculo.modelo"
            class="w-100 "
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import qeryVehiculoByAnioAndModelo from "~/apollo/getVehiculosPorModelo";
export default {
  name: "ShowProduct",
  data() {
    return {
      vehiculoImagenesSelected: null,
      url_previe_img: {
        type: String,
      },
    };
  },
  mounted() {
    this.setUrlImgPreview();
  },
  created() {
    if (process.client && localStorage.getItem("vehiculoSelected")) {
        this.$store.commit(
        "setVehiculoSelected",
        JSON.parse(localStorage.getItem("vehiculoSelected") || {})
      );
      
    }
  },
  methods: {
    refreshPreview(vehiculoimagen) {
      this.url_previe_img = vehiculoimagen.url_imagen.url;
      this.$store.commit(
        "setVehiculoSelected",vehiculoimagen)
      localStorage.setItem("vehiculoSelected", JSON.stringify(vehiculoimagen))
     
    },
    setUrlImgPreview() {
      this.url_previe_img = this.vehiculoSelected.url_imagen.url;
    },
    goToShowInformation() {
      this.$router.push(`/products/${this.$route.params.id}/personalizar/main`);
    },
  },
  computed: {
    RouteServer() {
      return process.env.baseUrl;
    },
    ...mapGetters(["vehiculoSelected"])
  },
  apollo: {
    vehiculoimagens: {
      prefetch: false,
      query: qeryVehiculoByAnioAndModelo,
      variables() {
        const where = {
          vehiculoanio: {
            vehiculo: {
              id: this.vehiculoSelected.id? this.vehiculoSelected.vehiculoanio.vehiculo.id:0,
            },
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          console.log("error", data);
          this.vehiculoImagenesSelected = data.vehiculoimagens;
        }
      },
    },
  },
};
</script>

<style>
</style>