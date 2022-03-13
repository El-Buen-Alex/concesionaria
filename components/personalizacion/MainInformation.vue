<template>
  <div>
    <h1 class="font-bold text-xl text-center text-white bg-gray-700 rounded-sm mt-3 lg:mt-0">INFORMACION PRINCIPAL</h1>
    <ul v-if="!$apollo.queries.traccionDetalles.loading">
      <li v-for="detalle in motorDetalle" :key="detalle.detalle">
        {{ detalle.detalle }}
      </li>

      <li v-for="detalle in paqueteDetalle" :key="detalle.detalle">
        {{ detalle.detalle }}
      </li>

      <li v-for="detalle in traccionDetalle" :key="detalle.detalle">
        {{ detalle.detalle }}
      </li>

      <li v-if="transmisiones.length > 0" :key="transmisiones[0].detalle">
        {{ transmisiones[0].tipotransmision.tipo }} de
        {{ transmisiones[0].detalle }}
      </li>
    </ul>
    <div class="w-full flex px-1">
      <div class="w-1/3 px-2">
        <button @click="goToInicio()" class="w-full bg-red-600">
          
            Atras
        </button>
      </div>
      <div class="w-2/3 px-2">
        <button class="w-full bg-green-600">
          <NuxtLink :to="`/products/${id}/personalizar/potencia`"
            >Siguiente</NuxtLink
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GetMotorDetalleByIdMotor from "~/apollo/GetMotorDetalleByIdMotor";
import GetPaqueteDetalleByIdPaquete from "~/apollo/GetPaqueteDetalleByIdPaquete";
import GetTraccionDetalleByIdTraccion from "~/apollo/GetTraccionDetalleByIdTraccion";
export default {
  data() {
    return {
      id: 0,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.$apollo.queries.traccionDetalles.start();
    this.$apollo.queries.motorDetalles.start();
    this.$apollo.queries.paqueteDetalles.start();
    this.setValoresPorDefault();
  },
  methods: {
    ...mapActions(["addItemToCart", "deleteCartItem"]),
    setValoresPorDefault() {
     
        if(this.getCart.length==1){
          this.addItemToCart({
          cartItem: this.motorSelected,
          campo: "motor",
        }).then(() => {
          this.addItemToCart({
            cartItem: this.paqueteSelected,
            campo: "paquete",
          }).then(() => {
            console.log(this.paqueteSelected);
          });
        });
        this.addItemToCart({
          cartItem: this.traccionSelected,
          campo: "traccion",
        });
        this.addItemToCart({
          cartItem: this.transmisionSelected,
          campo: "transmision",
        });
        this.$store.commit("setIsSetDefault", true);
        }
      
    },
    goToInicio(){
      this.$store.commit("setStartProcess",false)
      localStorage.setItem("startProcess", false)
      this.$router.go(-1)
    }
  },
  apollo: {
    motorDetalles: {
      prefetch: false,
      query: GetMotorDetalleByIdMotor,
      variables() {
        const where = {
          motor: {
            id: this.motores[0].id,
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setMotorDetalle", data.motorDetalles);
        }
      },
    },
    paqueteDetalles: {
      prefetch: false,
      query: GetPaqueteDetalleByIdPaquete,
      variables() {
        const where = {
          paquete: {
            id: this.paquetes[0].id,
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setPaqueteDetalle", data.paqueteDetalles);
        }
      },
    },
    traccionDetalles: {
      prefetch: false,
      query: GetTraccionDetalleByIdTraccion,
      variables() {
        const where = {
          traccion: {
            id: this.tracciones.length > 0 ? this.tracciones[0].id : 0,
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setTraccionDettale", data.traccionDetalles);
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      "isSetDefault",
      "motorSelected",
      "paqueteSelected",
      "transmisionSelected",
      "traccionSelected",
      "getCart",
      "motores",
      "transmisiones",
      "paquetes",
      "motorDetalle",
      "paqueteDetalle",
      "tracciones",
      "traccionDetalle",
    ]),
  },
};
</script>
