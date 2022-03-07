<template>
  <div v-if="this.vehiculoSelected.id">
    <MainInformation v-if="!$apollo.loading" />
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
         //data.transmisions[0].idUnique = data.transmisions[0].id + "tranmision";
         this.$store.commit("setTransmisiones", data.transmisions);
         this.$store.commit("setTransmisionSelected", data.transmisions[0]);
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
           console.log(this.where)
         //data.motors[0].idUnique = data.motors[0].id + "motor";
        this.$store.commit("setMotores", data.motors);
        this.$store.commit("setMotorSelected", data.motors[0])

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
            console.log(this.where)
         //data.paquetes.idUnique = data.paquetes[0].id + "paquete";
         this.$store.commit("setPaquetes", data.paquetes);
         this.$store.commit("setPaqueteSelected", data.paquetes[0]);

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
          console.log(this.where)
          // data.traccions[0].idUnique = data.traccions[0].id + "traccion";
           this.$store.commit("setTracciones", data.traccions);
           this.$store.commit("setTraccionSelected", data.traccions[0]);

        }
      },
    },
  },
  mounted() {  
    this.where = {
      "vehiculoanio": {
        "id": this.vehiculoSelected.vehiculoanio.id,
      },
    };
    console.log("kpajo")
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