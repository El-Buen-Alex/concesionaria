<template>
  <div class="flex justify-center mt-2 h-auto">
    <div class="w-5/6 bg-black h-full rounded-sm">
      <div v-if="$apollo.loading">Loading..-</div>
      <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4 py-5">
        <div class="px-2 text-white">
          {{ category.name }}
        </div>
        <div
          class="
            px-2
            h-full
            w-full
            hover:border-2 hover:border-yellow-600 hover:rounded-md
          "
          v-for="vehiculoInformation in vehiculos"
          :key="vehiculoInformation.id"
          @click="AddVehiculoToCart(vehiculoInformation)"
        >
          <NuxtLink
            clasS=" flex items-center "
            :to="`/products/${vehiculoInformation.id}`"
          >
            <div class="bg-white w-full rounded-sm">
              <div class="h-36 flex justify-center overflow:hidden">
                <img
                  class="max-w-full max-h-full"
                  :src="
                    RouteServer + vehiculoInformation.url_imagen.url
                  "
                  :alt="vehiculoInformation.url_imagen.name"
                  srcset=""
                />
              </div>
              <p class="w-full font-bold text-xl flex justify-center">
                {{ vehiculoInformation.vehiculoanio.vehiculo.modelo }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getVehiculosByCategoryId from "~/apollo/getVehiculoAnio";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      vehiculos: [],
    };
  },
  mounted() {
    this.getVehiculos();
  },
  methods: {
    ...mapActions(["addItemToCart"]),
    getVehiculos() {
      this.$apollo.queries.vehiculoimagens.start();
    },
    AddVehiculoToCart(vehiculoInformation) {
      this.$store.commit("setCart", []);
      this.addItemToCart({
        cartItem: vehiculoInformation.vehiculoanio,
        campo: "vehiculo",
      });
      this.$store.commit("setVehiculoSelected", vehiculoInformation);
      localStorage.setItem("vehiculoSelected", JSON.stringify(vehiculoInformation));
    },
  },
  apollo: {
    vehiculoimagens: {
      prefetech: false,
      query: getVehiculosByCategoryId,
      variables() {
        const where = {
          vehiculoanio: {
            vehiculo: {
              categoria: {
                id: this.category.id,
              },
            },
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.vehiculos = data.vehiculoimagens;
          if (this.vehiculos.length > 1) {
            let hash = {};
            this.vehiculos = this.vehiculos.filter((elemento) => {
              let exists = !hash[elemento.vehiculoanio.vehiculo.id];
              hash[elemento.vehiculoanio.vehiculo.id] = true;
              return exists;
            });
            hash = {};
          }
        }
      },
    },
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed:{
     RouteServer() {
      return process.env.baseUrl;
    },
  }
};
</script>