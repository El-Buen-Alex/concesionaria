<template>
  <div>
    <div v-if="motores.length > 0">
      <h1 class="bg-gray-700 text-center font-bold text-white mb-3 rounded-sm">MOTOR</h1>
      <div class="flex">
        <Motor
          v-for="motor in motores"
          :key="motor.id"
          :motor="motor"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
    <div v-if="transmisiones.length > 0">
      <h1 class="bg-gray-700 text-center font-bold text-white my-3 rounded-sm">
        TRANSMISION
      </h1>
      <div class="flex">
        <Transmision
          v-for="transmision in transmisiones"
          :key="transmision.id"
          :transmision="transmision"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
    <div v-if="tracciones.length > 0">
      <h1 class="bg-gray-700 text-center font-bold text-white my-3 rounded-sm">TRACCION</h1>
      <div class="flex">
        <Traccion
          v-for="traccion in tracciones"
          :key="traccion.id"
          :traccion="traccion"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
    
    <Navigation v-on:prev="$router.go(-1)" v-on:next="goToPaquetes"/>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Motor from "~/components/personalizacion/containers/Motor.vue";
import Transmision from "~/components/personalizacion/containers/Transmision.vue";
import Traccion from "~/components/personalizacion/containers/Traccion.vue";
import Navigation from '~/components/shared/Navigation.vue'
export default {
  data() {
    return{
     
    }
  },
  computed: {
    ...mapGetters([
      "motores",
      "transmisiones",
      "tracciones",
      "getCart",
      "motorSelected",
      "traccionSelected",
      "transmisionSelected",
    ]),
  },
  components: {
    Motor,
    Transmision,
    Traccion,
    Navigation,
  },
  mounted() {
    if(process.client && this.motores.length==0){
      this.$store.commit(
        "setMotores",
        JSON.parse(localStorage.getItem("motores") || {})
      );
       this.$store.commit(
        "setMotorSelected",
        JSON.parse(localStorage.getItem("motorSelected") || {})
      );
      this.$store.commit(
        "setTracciones",
        JSON.parse(localStorage.getItem("tracciones") || {})
      );
       this.$store.commit(
        "setTraccionSelected",
        JSON.parse(localStorage.getItem("traccionSelected") || {})
      );
      this.$store.commit(
        "setTransmisiones",
        JSON.parse(localStorage.getItem("transmisiones") || {})
      );
       this.$store.commit(
        "setTransmisionSelected",
        JSON.parse(localStorage.getItem("transmisionSelected") || {})
      );
    }
  },
  methods: {
    ...mapActions(["addItemToCart", "deleteCartItem"]),
    addAndDeleteItem(prevItem, newItem) {
      this.deleteCartItem(prevItem.idUnique).then(() => {
        this.addItemToCart(newItem);
        const {campo}= newItem
        const {cartItem}=newItem
        if(process.client){
          localStorage.setItem(campo+"Selected", JSON.stringify(cartItem))
        }
      });
    },
    goToPaquetes(){
      if(this.motorSelected.id && this.traccionSelected.id && this.transmisionSelected.id>0){
        this.$router.push(`/products/${this.$route.params.id}/personalizar/paquetes`)
      }
    },
    goBack(){
      this.$router.go(-1)
    }
  },
};
</script>
