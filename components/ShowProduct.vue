<template>
    <div>
        <div class="w-1/2">
            <div>
                <h1>{{vehiculoInformation.vehiculoanio.vehiculo.modelo}}</h1>
            </div>
            
            <div>
                <div>
                  <img :src="RouteServer+url_previe_img" alt="preview_del_vehiculo" class="w-100">
                </div>
                <div class="flex">
                    <div class="w-1/3" v-for="vehiculoimagen in vehiculoImagenesSelected" :key="vehiculoimagen.id">
                        <input type="radio" :id="vehiculoimagen.id" name="drone" @click="refreshPreview(vehiculoimagen)" :checked="vehiculoimagen.id==vehiculoInformation.id? true : ''">
                        <img :src="RouteServer+vehiculoimagen.url_imagen.url" :alt="vehiculoimagen.vehiculoanio.vehiculo.modelo" class="w-100">
                    </div>
                </div> 
            </div>
        </div>
        <div class="w-1/2"></div>

    </div>
</template>

<script>
import qeryVehiculoByAnioAndModelo from '~/apollo/getVehiculosPorModelo'
export default {
    name:'ShowProduct',
    data(){
        return {
            vehiculoImagenesSelected:null,
            url_previe_img:{
                type:String
            }
        }
    },
    props: {
        vehiculoInformation:{
            required:true
        }
    },
    mounted() {
        this.setUrlImgPreview()
    },
    methods: {
        refreshPreview(vehiculoimagen){
            this.url_previe_img=vehiculoimagen.url_imagen.url
        },
        setUrlImgPreview(){
            this.url_previe_img=this.vehiculoInformation.url_imagen.url
        }
    },
    computed: {
        RouteServer(){
            return process.env.baseUrl;
        }
    },
    apollo:{
        vehiculoimagens:{
            prefetch:true,
            query:qeryVehiculoByAnioAndModelo,
            variables(){
                const where={
                    "vehiculoanio":{
                        "vehiculo":{
                            "id":this.vehiculoInformation.vehiculoanio.vehiculo.id
                        }
                    }
                }
                return {
                    where:where
                }
            },
             result ({ data, loading }) {
                if (!loading) {
                    console.log("error",data)
                    this.vehiculoImagenesSelected=data.vehiculoimagens
                }
            },
        }
    },
}
</script>

<style>

</style>