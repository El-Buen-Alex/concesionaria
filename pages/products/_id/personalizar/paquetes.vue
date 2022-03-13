<template>
  <div>
    <div v-if="paquetes.length > 0">
      <h1 class="rounded-sm bg-gray-700 text-center font-bold text-white mb-3">PAQUETES</h1>
      <div class="flex">
        <Paquete
          v-for="paquete in paquetes"
          :key="paquete.id"
          :paquete="paquete"
          v-on:addItem="addAndDeleteItem"
        />
      </div>
    </div>
       
    <Navigation v-on:prev="$router.go(-1)" v-on:next="goToAccesorios"/>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Paquete from "~/components/personalizacion/containers/Paquete.vue";
import Navigation from '~/components/shared/Navigation.vue'

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
    Navigation,
  },
};
</script>

<style>
</style>