<template>
  <div>
      <ul v-if="!$apollo.loading">
          <li v-for="detalle in motorDetalle" :key="detalle.detalle">{{detalle.detalle}}</li>
      
          <li v-for="detalle in paqueteDetalle" :key="detalle.detalle">{{detalle.detalle}}</li>
      
          <li v-for="detalle in traccionDetalle" :key="detalle.detalle">{{detalle.detalle}}</li>
     
          <li v-if="transmisiones.length>0" :key="transmisiones[0].detalle">{{transmisiones[0].tipotransmision.tipo}} de {{transmisiones[0].detalle}}</li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GetMotorDetalleByIdMotor from '~/apollo/GetMotorDetalleByIdMotor'
import GetPaqueteDetalleByIdPaquete from '~/apollo/GetPaqueteDetalleByIdPaquete'
import GetTraccionDetalleByIdTraccion from '~/apollo/GetTraccionDetalleByIdTraccion'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        if(this.tracciones.length>0){
          this.$apollo.queries.traccionDetalles.start();  

        }
        if(this.motores.length>0){
            this.$apollo.queries.motorDetalles.start();
        }
        if(this.paquetes.length>0){
          this.$apollo.queries.paqueteDetalles.start();
        }
    },
    apollo:{
        motorDetalles:{
            prefetch: false,
            query: GetMotorDetalleByIdMotor,
            variables() {
                const where={
                     "motor":{
                        "id":this.motores[0].id
                    }
                }
                return {
                where: where,
                };
            },
            result({ data, loading }) {
                if (!loading) {
                    this.$store.commit('setMotorDetalle', data.motorDetalles)
                }
            },
        },
        paqueteDetalles:{
            prefetch: false,
            query: GetPaqueteDetalleByIdPaquete,
            variables() {
                const where={
                     "paquete":{
                        "id":this.paquetes[0].id
                    }
                }
                return {
                where: where,
                };
            },
            result({ data, loading }) {
                if (!loading) {
                    this.$store.commit('setPaqueteDetalle', data.paqueteDetalles)
                }
            },
        },
        traccionDetalles:{
            prefetch: false,
            query: GetTraccionDetalleByIdTraccion,
            variables() {
                
                const where={
                     "traccion":{
                        "id":this.tracciones.length>0? this.tracciones[0].id :0
                    }
                }
                return {
                where: where,
                };
            },
            result({ data, loading }) {
                if (!loading) {
                    this.$store.commit('setTraccionDettale', data.traccionDetalles)
                }
            },
        }
    },
    computed: {
        ...mapGetters(["motores","transmisiones", "paquetes", "motorDetalle", "paqueteDetalle", "tracciones", "traccionDetalle"]),
    },
}
</script>
