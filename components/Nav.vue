<template>
  <div class="navbar flex text-white relative">
    <div class="nav-item-center flex space-x-0 sm:space-x-20 p-5 mx-auto">
      <button  @click="goToUrl('/')" >Escoge Tu Vehiculo-></button>
      <button  :disabled="CanPersonalice==0" :class="CanPersonalice==0? 'disabled':'active'" @click="goToUrl(`/products/${vehiculoSelected.id}/personalizar/main`)">Personaliza-></button>
      <button  :disabled="CanSeeResumen==0" :class="CanSeeResumen==0? 'disabled':'active'" @click="goToUrl(`/products/resumen/${vehiculoSelected.id}`)">Resumen de Tu Elección-></button>
      <button  :disabled="CanComprar==0" :class="CanComprar==0? 'disabled':'active'" @click="goToUrl(`/products/comprar/${vehiculoSelected.id}`)">Comprar En Linea!</button>
      <div  class=" absolute bottom-0  right-0 lg:top-1/3 lg:right-2 lg:mt-0">
          <span class="text-green-500">Total Aproximado: ${{getCartTotal}} </span>
      </div>
    </div>
    
    <ModalCart
    v-if="getCartTotal!=0"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalCart from '~/components/cart/modalCart.vue';

export default {
    components: {
      ModalCart,
    },
    data(){
        return{
            
        }
    },
    mounted() {
        
    },
    methods:{
        goToUrl(url){
          this.$router.push(url);
        }
    },
    computed:{
        ...mapGetters(["CanPersonalice", "CanSeeResumen", "CanComprar", "getCartTotal", "vehiculoSelected"]),
    }
};
</script>

<style scoped>
.ham-menu {
  background-color: #000;
  width: 3em;
  height: 3em;
  border-radius: 1.5em;
}
.navbar {
  background-color: rgb(24, 20, 22);
}
.cartCount {
  background: #000;
  border-radius: 30%;
}
.disabled{
    color: gray;
    cursor: default;
}
.active{
    color: white;
    cursor:pointer ;
}
</style> 