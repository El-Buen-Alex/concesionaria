<template>
    <div>
        <div v-for="(item, index) in getCart" :key="index" >
            <p v-on="cargar(item, index)">-----------------</p>
            <p v-if="item.vehiculo">{{item.vehiculo.modelo}} -> {{item.precio}}</p>
            <p v-if="item.especificacion">{{item.especificacion}} -> {{item.precio}}</p>
            <p v-if="item.tipotransmision">{{item.tipotransmision.tipo}} -> {{item.precio}}</p>
            <p v-if="item.tipotraccion">{{item.tipotraccion.tipo}} -> {{item.precio}}</p>
            <p v-if="item.name">{{item.name}} -> {{item.precio}}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters} from "vuex";

export default {
    name: "CartComponent",
    data() {
        return {
            contador:0,
        }
    },
    methods:{
        cargar(algo, numero){
            console.log("Mostrando"+numero);
            console.log(algo);
            if(numero==4){
                console.log(algo.name)
            }
        },
    },
    computed:{
        ...mapGetters(["getCartTotal","getCart"]),
    }
}
</script>