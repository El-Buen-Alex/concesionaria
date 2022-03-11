<template>
    <div>
        <div v-for="(item, index) in getCart" :key="index">
            <p>{{item.vehiculo.modelo}} --> $ {{item.precio}}</p>
            <p>{{item}}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters} from "vuex";

export default {
    name: "CartComponent",
    computed:{
        ...mapGetters(["getCartTotal","getCart"]),
    }
}
</script>