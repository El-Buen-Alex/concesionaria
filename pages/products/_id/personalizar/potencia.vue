<template>
  <div>
      <div v-if="motores.length>0">
        <h1 class="bg-black text-center font-bold text-white mb-3">MOTOR</h1>
        <div class="flex">
         <Motor v-for="motor in motores" :key="motor.id" :motor="motor" v-on:addItem="addAndDeleteItem"/>
        </div>
      </div>
      <div v-if="transmisiones.length>0">
        <h1 class="bg-black text-center font-bold text-white my-3">TRANSMISION</h1>
        <div class="flex">
          <Transmision v-for="transmision in transmisiones" :key="transmision.id" :transmision="transmision" />
        </div>
      </div>
      <div v-if="tracciones.length>0">
        <h1 class="bg-black text-center font-bold text-white my-3">TRACCION</h1>
        <div class="flex">
          <Traccion v-for="traccion in tracciones" :key="traccion.id" :traccion="traccion"/>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Motor from '~/components/personalizacion/containers/Motor.vue'
import Transmision from '~/components/personalizacion/containers/Transmision.vue'
import Traccion from '~/components/personalizacion/containers/Traccion.vue'
export default {
  computed:{
    ...mapGetters(["motores","transmisiones","tracciones","getCart"]),
  },
  components:{
    Motor,
    Transmision,
    Traccion
  },
  methods:{
    ...mapActions(["addItemToCart","deleteCartItem"]),
    addAndDeleteItem(prevItem, newItem){
      this.deleteCartItem(prevItem).then(()=>{
        this.addItemToCart(newItem)
        this.$store.commit('setMotorSelected', newItem)
      })
    }
  }
}
</script>
