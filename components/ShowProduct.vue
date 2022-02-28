<template>
    <div>
        <div class="w-1/2">
            <div>
                <h1>{{vehiculo.vehiculoanio.vehiculo.modelo}}</h1>
            </div>
            <div>
                <div>
                  <img :src="RouteServer+vehiculo.url_imagen.url" :alt="vehiculo.vehiculoanio.vehiculo.modelo" class="w-100">
                </div>
                <div>

                </div>
            </div>
        </div>
        <div class="w-1/2"></div>

    </div>
</template>

<script>
import qeryVehiculoByAnioAndModelo from '~/apollo/getVehiculosPorAnioYModelo'
export default {
    name:'ShowProduct',
    props: {
        vehiculo:{
            required:true
        }
    },
    mounted() {
        console.log(this.vehiculo)
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
                        "anio":"2022",
                        "vehiculo":""+this.vehiculo.vehiculoanio.vehiculo.id
                    }
                }
                return {
                    where:where
                }
            },
             result ({ data, loading }) {
                if (!loading) {
                    console.log("error",data)
                }
            },
        }
    },
}
</script>

<style>

</style>