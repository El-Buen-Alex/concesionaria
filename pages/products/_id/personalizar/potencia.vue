<template>
  <div>
    <div v-if="motores.length > 0">
      <h1 class="bg-black text-center font-bold text-white mb-3">MOTOR</h1>
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
      <h1 class="bg-black text-center font-bold text-white my-3">
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
      <h1 class="bg-black text-center font-bold text-white my-3">TRACCION</h1>
      <div class="flex">
        <Traccion
          v-for="traccion in tracciones"
          :key="traccion.id"
          :traccion="traccion"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
    <div class="w-full flex px-1">
      <div class="w-1/3 px-2">
        <button class="w-full bg-red-600">
          <NuxtLink :to="`/products/${id}/personalizar/potencia`"
            >Atras</NuxtLink
          >
        </button>
      </div>
      <div class="w-2/3 px-2">
        <button
            class="w-full bg-green-600" 
            @click="goToPaquetes()"
          >
            Siguiente
          </button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Motor from "~/components/personalizacion/containers/Motor.vue";
import Transmision from "~/components/personalizacion/containers/Transmision.vue";
import Traccion from "~/components/personalizacion/containers/Traccion.vue";
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
  },
  created() {
  },
  methods: {
    ...mapActions(["addItemToCart", "deleteCartItem"]),
    addAndDeleteItem(prevItem, newItem) {
      this.deleteCartItem(prevItem.idUnique).then(() => {
        this.addItemToCart(newItem);
      });
    },
    goToPaquetes(){
      if(this.motorSelected.id && this.traccionSelected.id && this.transmisionSelected.id>0){
        this.$router.push(`/products/${this.$route.params.id}/personalizar/paquetes`)
      }
    }
  },
};
</script>
