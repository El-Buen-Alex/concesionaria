<template>
  <div v-if="this.vehiculoSelected!==[]">
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
         
          this.$store.commit("setTransmisiones", data.transmisions);
          this.$store.commit("setTransmisionSelected", data.transmisions[0]);
          if(process.client){
            localStorage.setItem("transmisiones", JSON.stringify(data.transmisions))
            localStorage.setItem("transmisionSelected", JSON.stringify(data.transmisions[0]))
          }
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
         
        this.$store.commit("setMotores", data.motors);
        this.$store.commit("setMotorSelected", data.motors[0])
        if(process.client){
            localStorage.setItem("motores", JSON.stringify(data.motors))
            localStorage.setItem("motorSelected", JSON.stringify(data.motors[0]))
          }
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
           
         
         this.$store.commit("setPaquetes", data.paquetes);
         this.$store.commit("setPaqueteSelected", data.paquetes[0]);
          if(process.client){
            localStorage.setItem("paquetes", JSON.stringify(data.paquetes))
            localStorage.setItem("paqueteSelected", JSON.stringify(data.paquetes[0]))
          }
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
         
         
           this.$store.commit("setTracciones", data.traccions);
           this.$store.commit("setTraccionSelected", data.traccions[0]);
          if(process.client){
            localStorage.setItem("tracciones", JSON.stringify(data.traccions))
            localStorage.setItem("traccionSelected", JSON.stringify(data.traccions[0]))
          }
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