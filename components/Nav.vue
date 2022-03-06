<template>
  <div class="navbar flex text-white relative">
    <div class="nav-item-center flex space-x-6 sm:space-x-20 p-5 mx-auto">
      <NuxtLink to="/" >Escoge Tu Vehiculo-></NuxtLink>
      <NuxtLink to="/all"  :class="CanPersonalice? 'active': 'disabled'">Personaliza-></NuxtLink>
      <NuxtLink to="/men"  :class="CanSeeResumen? 'active': 'disabled'">Resumen de Tu Elección-></NuxtLink>
      <NuxtLink to="/women" :class="CanComprar? 'active': 'disabled'">Comprar En Linea!</NuxtLink>
      <div  class=" absolute top-1/3 right-2">
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
        
    },
    computed:{
        ...mapGetters(["CanPersonalice", "CanSeeResumen", "CanComprar", "getCartTotal"]),
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