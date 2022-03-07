<template>
    <div class="flex justify-center mt-2 h-48 ">
        <div class="w-5/6  bg-black h-full">
                <div v-if="$apollo.loading">Loading..-</div>
                <div v-else class="flex items-center">
                    <div class="w-1/5 px-2 text-white">
                        {{category.name}}
                    </div>
                    <div class="w-1/5 px-2 h-full"  v-for="vehiculoInformation in vehiculos" :key="vehiculoInformation.id" @click="AddVehiculoToCart(vehiculoInformation)">
                         <NuxtLink clasS=" flex items-center" :to="`/products/${vehiculoInformation.id}`">
                            <div class="bg-white rounded-lg shadow-md w-full ">
                                <div class="h-32">
                                <img class="w-full h-full" :src="'http://localhost:1337'+vehiculoInformation.url_imagen.url" :alt="vehiculoInformation.url_imagen.name" srcset="">
                                </div>
                                <p class="w-full fw-bold  flex justify-center">{{vehiculoInformation.vehiculoanio.vehiculo.modelo}}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
        </div> 
    </div>
</template>

<script>
import getVehiculosByCategoryId from '~/apollo/getVehiculoAnio'
import {mapActions} from "vuex";
export default {

    data() {
        return {
            vehiculos:[],
        }
    },
    mounted(){
        this.getVehiculos()
    },
    methods:{
        ...mapActions(['addItemToCart']),
        getVehiculos(){
            this.$apollo.queries.vehiculoimagens.start()
        },
        AddVehiculoToCart(vehiculoInformation){
            this.$store.commit("setCart", [])
            this.addItemToCart({cartItem:vehiculoInformation.vehiculoanio, campo:'vehiculo'})
        }
        
    },
    apollo:{
        vehiculoimagens:{
            prefetech:false,
            query:getVehiculosByCategoryId,
            variables(){
                const where={
                    "vehiculoanio":{
                        "vehiculo":{
                            "categoria":{
                                "id": this.category.id
                            }
                        }
                    }
                }
                return {
                    where:where
                }
            },
             result ({ data, loading }) {
                if (!loading) {
                     this.vehiculos=data.vehiculoimagens
                     //cuando ya estemos en prod
                    // if(this.vehiculos.length>1){
                    //      let hash={}
                    //  this.vehiculos=this.vehiculos.filter((elemento)=>{
                    //      let exists = !hash[elemento.vehiculoanio.vehiculo.id];
                    //     hash[elemento.vehiculoanio.vehiculo.id] = true;
                    //     return exists;
                    //  })
                    //  hash={}
                    //  console.log( this.vehiculos)
                    // }
                    
                }
            },
        }
    },
    props: {
        category:{
            type:Object,
            required:true
        }
    }


}
</script>