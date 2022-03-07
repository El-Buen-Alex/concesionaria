<template>
    <div class="fixed bottom-3 right-3 shadow-2xl bg-transparent">
        
        <button 
        class="buttonModal px-3 py-3 bg-black hover:bg-green-500 rounded-full"
        @click="funcionModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </button>

        <div 
        class="fixed w-full h-full flex z-[1]" 
        v-if="abrirModal">
            <div class="fixed bottom-3 right-3 bg-black rounded-3xl">
                <div class="absolute right-2 pt-2.5">
                    <button @click="funcionModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="p-8" v-for="(item, index) in getCart" :key="index">
                    <p>{{item.id}}</p>
                    <p>Total ---> {{getCartTotal}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: 'ModalCart',
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
        // ...mapState(["cartItems"]),
        ...mapGetters(["getCartTotal","getCart"]),
    }
}
</script>

<style scoped>

</style>