<template>
  <div v-if="this.vehiculoSelected.id">
    <div>
      <h1 class="text-5xl text-center bg-black text-white p-2 rounded-lg">
        {{ vehiculoInformation.vehiculoanio.vehiculo.modelo }}
      </h1>
    </div>
    <div class="w-full">
      <div class="w-full">
        <img
          :src="RouteServer + url_previe_img"
          alt="preview_del_vehiculo"
          class="w-full"
        />
      </div>
      <div class="flex">
        <!-- OJO -->
        <div
          class="w-1/3"
          v-for="vehiculoimagen in vehiculoImagenesSelected"
          :key="vehiculoimagen.id"
        >
          <input
            type="radio"
            :id="vehiculoimagen.id"
            name="drone"
            @click="refreshPreview(vehiculoimagen)"
            :checked="vehiculoimagen.id == vehiculoInformation.id ? true : ''"
          />
          <img
            :src="RouteServer + vehiculoimagen.url_imagen.url"
            :alt="vehiculoimagen.vehiculoanio.vehiculo.modelo"
            class="w-100"
          />
        </div>
      </div>
    </div>

    <!-- <NuxtLink :to="`/products/${vehiculoInformation.id}/personalizar/main`">Child 2</NuxtLink> -->
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
  props: {
    vehiculoInformation: {
      required: true,
    },
  },
  mounted() {
    this.setUrlImgPreview();
    //this.goToShowInformation();
  },
  created() {
    if (process.client) {
        this.$store.commit(
        "setVehiculoSelected",
        JSON.parse(localStorage.getItem("vehiculoSelected") || {})
      );
      
    }
  },
  methods: {
    refreshPreview(vehiculoimagen) {
      this.url_previe_img = vehiculoimagen.url_imagen.url;
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