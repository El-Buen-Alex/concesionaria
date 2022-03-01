<template>
  <div v-if="!$apollo.loading">
    <MainInformation  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GetTransmisionesByIdVehiculoanio from "~/apollo/GetTransmisionesByIdVehiculoanio";
import GetMotorsByIdVehiculoAnio from "~/apollo/GetMotorsByIdVehiculoAnio";
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
    console.log(this.tranmisiones)
  },
  methods: {
    ...mapActions(['addItemToCart']),

    getMotors() {
      this.$apollo.queries.motors.start();
    },
    getTransmisiones(){
      this.$apollo.queries.transmisions.start();
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