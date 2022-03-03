<template>
<div class="w-1/2 px-1" v-if="detalles.length>0">
        <CardItem :name="transmision.tipotransmision.tipo" :detalles="detalles" :nameInput="'transmisiones'"/>
    </div>
</template>

<script>
import CardItem from '../../wrapers/CardItem.vue'
export default {
    data() {
        return {
            detalles:[]
        }
    },
    mounted(){
        this.detalles.push(this.transmision)
    },
  props: {
    transmision: {
      required: true,
    },
  },
  components: {
    CardItem,
  },
};
</script>

