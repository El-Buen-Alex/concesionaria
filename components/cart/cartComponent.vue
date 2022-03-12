<template>
    <div>
        <ul v-if="concesionarioSelected.name">
            <li>{{concesionarioSelected.provincia.name}}</li>
            <li>{{concesionarioSelected.name}}</li>
        </ul>
        <ul v-for="(item, index) in getCart" :key="index">
            <p v-on="cargar(item, index, concesionarioSelected)" class="text-green-500">------------------------------------</p>
            <li v-if="item.vehiculo">{{item.vehiculo.modelo}} ({{item.anio.anio_publicado}}) -> {{item.precio}}</li>
            <li v-if="item.especificacion">{{item.especificacion}} -> {{item.precio}}</li>
            <li v-if="item.tipotransmision">{{item.tipotransmision.tipo}} -> {{item.precio}}</li>
            <li v-if="item.tipotraccion">{{item.tipotraccion.tipo}} -> {{item.precio}}</li>
            <li v-if="item.name">{{item.name}} -> {{item.precio}}</li>
        </ul>
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
        cargar(algo, numero, ubicacion){
            console.log("Mostrando "+numero);
            console.log(algo);
            console.log(ubicacion);
        },
    },
    computed:{
        ...mapGetters(["getCartTotal","getCart","concesionarioSelected"]),
    }
}
</script>