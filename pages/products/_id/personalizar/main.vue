<template>
  <div>
    <MainInformation v-if="!$apollo.queries.traccions.loading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GetTransmisionesByIdVehiculoanio from "~/apollo/GetTransmisionesByIdVehiculoanio";
import GetMotorsByIdVehiculoAnio from "~/apollo/GetMotorsByIdVehiculoAnio";
import GetPaquetesByIdVehiculoanio from "~/apollo/GetPaquetesByIdVehiculoanio";
import GetTraccionesByIdVehiculoAnio from "~/apollo/GetTraccionesByIdVehiculoAnio";
import MainInformation from "~/components/personalizacion/MainInformation.vue";
export default {
  data() {
    return {
      idVehiculoanio: {
        type: Number,
      },
      where: {},
    };
  },
  apollo: {
    transmisions: {
      prefetch:false,
      query: GetTransmisionesByIdVehiculoanio,
      variables(){
        return{
          where: this.where
        }
      },
      result({ data, loading }) {
         if(!loading){
        // data.transmisions[0].idUnique = data.transmisions[0].id + "tranmision";
        // this.addItemToCart(data.transmisions[0]);
         this.$store.commit("setTransmisiones", data.transmisions);
        // console.log("que raross", this.getCart);
        console.log("recupere 1")
         }
      },
    },
    motors: {
      prefetch:false,
      query: GetMotorsByIdVehiculoAnio,
      variables(){
        return{
          where: this.where
        }
      },
      result({ data, loading }) {
        if(!loading){
        // data.motors[0].idUnique = data.motors[0].id + "motor";
        // this.addItemToCart(data.motors[0]);
        this.$store.commit("setMotores", data.motors);
        // this.$store.commit("setMotorSelected", data.motors[0]);
        console.log("recupere 2")

        }
      },
    },
    paquetes: {
      prefetch:false,
      query: GetPaquetesByIdVehiculoanio,
      variables(){
        return{
          where: this.where
        }
      },
      result({ data, loading }) {
         if(!loading){
        // data.paquetes.idUnique = data.paquetes[0].id + "paquete";
        // this.addItemToCart(data.paquetes[0]);
         this.$store.commit("setPaquetes", data.paquetes);
        // this.$store.commit("setPaqueteSelected", data.paquetes[0]);
        console.log("recupere 3")

         }
      },
    },
    traccions: {
      prefetch:false,
      query: GetTraccionesByIdVehiculoAnio,
      variables(){
        return{
          where: this.where
        }
      },
      result({ data, loading }) {
        if (!loading) {
          // data.traccions[0].idUnique = data.traccions[0].id + "traccion";
          // this.addItemToCart(data.traccions[0]);
           this.$store.commit("setTracciones", data.traccions);
          // this.$store.commit("setTraccionSelected", data.traccions[0]);
        console.log("recupere 4")

        }
      },
    },
  },
  created() {
    this.idVehiculoanio = this.vehiculoSelected.vehiculoanio.id;
    this.where = {
      vehiculoanio: {
        id: this.idVehiculoanio,
      },
    };
  },
  mounted() {
    // this.getMotors();
    // this.getTransmisiones();
    // this.getTracciones();
    // this.getPaquetes();
    console.log("jijijiajaija")
  },
  methods: {
    ...mapActions(["addItemToCart","deleteCartItem"]),

    getMotors() {
      this.$apollo.queries.motors.start();
    },
    getTransmisiones() {
      this.$apollo.queries.transmisions.start();
    },
    getTracciones() {
      this.$apollo.queries.traccions.start();
    },
    getPaquetes() {
      this.$apollo.queries.paquetes.start();
    },
  },
  computed: {
    ...mapGetters(["vehiculoSelected", "getCart","motores","tracciones", "transmisiones","paquetes"]),
  },
  components: {
    MainInformation,
  },
};
</script>

<style>
</style>