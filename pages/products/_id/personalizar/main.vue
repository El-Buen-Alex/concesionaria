<template>
  <div v-if="!$apollo.loading">
    <MainInformation  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GetTransmisionesByIdVehiculoanio from "~/apollo/GetTransmisionesByIdVehiculoanio";
import GetMotorsByIdVehiculoAnio from "~/apollo/GetMotorsByIdVehiculoAnio";
import GetPaquetesByIdVehiculoanio from '~/apollo/GetPaquetesByIdVehiculoanio'
import GetTraccionesByIdVehiculoAnio from '~/apollo/GetTraccionesByIdVehiculoAnio'
import MainInformation from '~/components/personalizacion/MainInformation.vue'
export default {
  data() {
    return {
      idVehiculoanio: {
        type: Number,
      },
      motors: {
        type: Array,
      },
      tranmisiones:{
        type:Array
      },
      paquetes:{
        type:Array
      },
      where: {},
    };
  },
  apollo: {
    transmisions: {
      prefetch: false,
      query: GetTransmisionesByIdVehiculoanio,
      variables() {
        return {
          where: this.where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.tranmisiones = data.transmisions;
          this.addItemToCart(this.tranmisiones[0])
          this.$store.commit('setTransmisiones', this.tranmisiones)
        }
      },
    },
    motors: {
      prefetch: false,
      query:  GetMotorsByIdVehiculoAnio,
      variables() {
        return {
          where: this.where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.motors = data.motors;
          this.addItemToCart(this.motors[0])
          this.$store.commit('setMotores', this.motors)
        }
      },
    },
    paquetes:{
      prefetch: false,
      query:  GetPaquetesByIdVehiculoanio,
      variables() {
        return {
          where: this.where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.paquetes = data.paquetes;
          this.addItemToCart(this.paquetes[0])
          this.$store.commit('setPaquetes', this.paquetes)
        }
      },
    },
    traccions:{
      prefetch: false,
      query:  GetTraccionesByIdVehiculoAnio,
      variables() {
        return {
          where: this.where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.addItemToCart(data.traccions[0])
          this.$store.commit('setTracciones', data.traccions)
        }
      },
    }
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
    this.getMotors();
    this.getTransmisiones()
    this.getTracciones()
    this.getPaquetes()
    console.log(this.tranmisiones)
  },
  methods: {
    ...mapActions(['addItemToCart']),

    getMotors() {
      this.$apollo.queries.motors.start();
    },
    getTransmisiones(){
      this.$apollo.queries.transmisions.start();
    },
    getTracciones(){
      this.$apollo.queries.traccions.start();
    },
    getPaquetes(){
      this.$apollo.queries.paquetes.start();
    }
  },
  computed: {
    ...mapGetters(["vehiculoSelected"]),
  },
  components: {
    MainInformation
  }
};
</script>

<style>
</style>