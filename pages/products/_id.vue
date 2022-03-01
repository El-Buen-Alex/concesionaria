<template>
    <div class="flex justify-center">
        <div v-if="$apollo.loading">Loading..-</div>
        <div v-else class="w-5/6">
            <ShowProduct :vehiculoInformation="vehiculoSelected"/>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import findVehiculoQery from '~/apollo/findVehiculoInformation'
import ShowProduct from '../../components/ShowProduct.vue'
export default {
      data() {
        return {
            id:{
                type:Number
            },
            vehiculoimagen:[]
        }
    },
    apollo:{
        vehiculoimagen:{
            prefetch:false,
            query:findVehiculoQery,
            variables(){
                return {
                    id:this.$route.params.id
                }
            },
             result ({ data, loading }) {
                if (!loading) {
                    this.$store.commit('setVehiculoSelected', data.vehiculoimagen)
                }
            },
        }
    },
    created(){
        this.getVechiuloById()
        this.activeCanPersonalizarLink()
    },
    methods:{
         getVechiuloById(){
             this.$apollo.queries.vehiculoimagen.start()             
        },
        activeCanPersonalizarLink(){
              this.$store.commit('setCanPersonalice', true)
        },
        addValorVehiculoPredeterminado(){
            this.$store.commit('setVehiculoSelected', data.vehiculoimagen)
        },
      
    },
    computed:{
        ...mapGetters(["vehiculoSelected"]),
    },
    components:{
        ShowProduct
    }
}
</script>