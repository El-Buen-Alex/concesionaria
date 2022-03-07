<template>
  <div>
    <div v-if="paquetes.length > 0">
      <h1 class="bg-black text-center font-bold text-white mb-3">PAQUETES</h1>
      <div class="flex">
        <Paquete
          v-for="paquete in paquetes"
          :key="paquete.id"
          :paquete="paquete"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
       <div class="w-full flex px-1">
      <div class="w-1/3 px-2">
        <button  @click="$router.go(-1)" class="w-full bg-red-600">
         Atras
        </button>
      </div>
      <div class="w-2/3 px-2">
        <button
            class="w-full bg-green-600" 
            @click="goToAccesorios()"
          >
            Siguiente
          </button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Paquete from "~/components/personalizacion/containers/Paquete.vue";
export default {
  computed: {
    ...mapGetters(["paquetes","paqueteSelected"]),
  },
  mounted() {
    if(process.client && this.paquetes.length==0){
       this.$store.commit(
        "setPaquetes",
        JSON.parse(localStorage.getItem("paquetes") || {})
      );
       this.$store.commit(
        "setPaqueteSelected",
        JSON.parse(localStorage.getItem("paqueteSelected") || {})
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
    goToAccesorios(){
        if(this.paqueteSelected.id){
            this.$router.push(`/products/${this.$route.params.id}/personalizar/accesorios`)
        }
    }
  },
  components: {
    Paquete,
  },
};
</script>

<style>
</style>