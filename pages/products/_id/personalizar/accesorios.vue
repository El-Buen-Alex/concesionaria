<template>
  <div v-if="this.getCart.length>0">
    <h1 CLASS="bg-gray-700 font-bold text-white text-xl text-center py-1 rounded-sm mb-3">PERSONALIZACION</h1>
    <div class="flex">
      <div class="w-1/4">
        <button :class="'w-full'+ (activeContent=='KIT'? ' border-b-4 border-indigo-500': '')" @click="showAccesorios('KIT')">KIT</button>
      </div>
      <div class="w-1/4 px-1">
        <button :class="'w-full'+ (activeContent=='IND'? ' border-b-4 border-indigo-500' : '')" @click="showAccesorios('IND')">INVIDUALES</button>
      </div>
      <div class="w-2/4">
        <button :class="'w-full'+ (activeContent=='MAT'? ' border-b-4 border-indigo-500' : '')" @click="showAccesorios('MAT')">MANTENIMIENTOS PREPAGADOS</button>
      </div>
    </div>
    <div class="w-full">
            <div v-if="activeContent=='KIT' && kits.length>0">
                <Kits :kits="kits" v-on:addOrEditAccesorio="addOrEditAccesorio" />
            </div>
            <div v-else-if="activeContent=='IND'">
                <Individuales :individuales="individuals" v-on:addOrEditAccesorio="addOrEditAccesorio"/>
            </div>
            <div v-else-if="activeContent=='MAT'">
                <Mantenimientos :mantenimientos="mantenimientos" v-on:addOrEditAccesorio="addOrEditAccesorio"/>
            </div>
    </div>
    <Navigation v-on:prev="$router.go(-1)" v-on:next="goToResumen"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GetKitsByIdVehiculoAnio from '~/apollo/GetKitsByIdVehiculoAnio'
import GetIndividualsByIdVehiculoAnio from '~/apollo/GetIndividualsByIdVehiculoAnio'
import GetMantenimientosByIdVehiculoAnio from '~/apollo/GetMantenimientosByIdVehiculoAnio'
import Kits from '~/components/personalizacion/containers/Accesorios/Kits.vue'
import Individuales from '~/components/personalizacion/containers/Accesorios/Individuales.vue'
import Mantenimientos from '~/components/personalizacion/containers/Accesorios/Mantenimientos.vue'
import Navigation from '~/components/shared/Navigation.vue'

export default {
    data() {
        return {
            class:' border-b-4 border-indigo-500',
            activeContent:'',
            kits:[],

        }
    },
    apollo:{
        kits: {
            prefetch: false,
            query: GetKitsByIdVehiculoAnio,
            variables() {
                const where={
                     "vehiculoanio":{
                        "id":this.$route.params.id
                    }
                }
                return {
                where: where,
                };
            },
        },
        individuals:{
            prefetch: false,
            query: GetIndividualsByIdVehiculoAnio,
            variables() {
                const where={
                     "vehiculoanio":{
                        "id":this.$route.params.id
                    }
                }
                return {
                where: where,
                };
            },
        },
        mantenimientos:{
            prefetch: false,
            query: GetMantenimientosByIdVehiculoAnio,
            variables() {
                const where={
                     "vehiculoanio":{
                        "id":this.$route.params.id
                    }
                }
                return {
                    where: where,
                };
            },
        }
    },
    mounted() {
        this.showAccesorios('KIT')
        if(process.client && this.getCart.length==0){
            this.$store.commit("setCart",JSON.parse( localStorage.getItem("cartItem") || {}))
        }
    }, 
    methods: {
        ...mapActions(["addItemToCart","deleteCartItem"]),
        showAccesorios(tipo){
            this.activeContent=tipo
        },
        addOrEditAccesorio(accion, accesorio, campo){
            if(accion==true){
                console.log("add", accion)
                this.addItemToCart({cartItem:accesorio, campo:campo});
            }else{
                const idUnique=accesorio.id+campo
                this.deleteCartItem(idUnique)
            }
        },
        goToResumen(){
        this.$router.push(`/products/resumen/${this.$route.params.id}`)

        }
    },
    components:{
        Kits,
        Individuales,
        Mantenimientos,
        Navigation
    },
    computed: {
        ...mapGetters(["getCart"])
    }
};
</script>

<style>
</style>