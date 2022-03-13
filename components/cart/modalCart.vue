<template>
    <div class="fixed bottom-3 right-3 shadow-2xl bg-transparent z-5">
        
        <button 
        class="buttonModal px-3 py-3 bg-black hover:bg-green-500 rounded-full"
        @click="funcionModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </button>

        <div 
        
        v-if="abrirModal">
            <div class="w-72 h-96 fixed bottom-3 right-3 bg-black rounded-3xl">
                <div class="absolute right-3 mt-5">
                    <button @click="funcionModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <p align="center" class="mt-6 text-green-500">Cart</p>
                <div class="contenedor w-30 h-64 mt-3 ml-7 mr-3.5 overflow-y-auto">
                    <CartComponent/>
                </div>
                <p class="mt-4 ml-7 text-green-500">Total ---> $ {{getCartTotal}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import CartComponent from '~/components/cart/cartComponent.vue';
import { mapGetters} from "vuex";

export default {
    name: 'ModalCart',
    components: {
      CartComponent,
    },
    data() {
        return {
            abrirModal: false,
        }
    },
    methods:{
        funcionModal(){
            this.abrirModal = !this.abrirModal;
            console.log(this.abrirModal);
        },
    },
    computed:{
        ...mapGetters(["getCartTotal"]),
    }
}
</script>

<style scoped>
.contenedor::-webkit-scrollbar{
    width: 7px;
    background: black;
}
.contenedor::-webkit-scrollbar-thumb{
    background: rgba(16, 185, 129, 1);
    border-radius: 5px;
}

</style>