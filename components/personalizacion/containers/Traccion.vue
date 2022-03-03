<template>
  <div class="w-1/2 px-1" v-if="detalles.length>0">
    <CardItem
      :name="traccion.tipotraccion.tipo"
      :detalles="detalles"
      :nameInput="'tracciones'"
    />
  </div>
</template>

<script>
import CardItem from "../../wrapers/CardItem.vue";
import GetTraccionDetalleByIdTraccion from '~/apollo/GetTraccionDetalleByIdTraccion'
export default {
  data() {
    return {
      detalles: [],
    };
  },
  mounted() {
      this.$apollo.queries.traccionDetalles.start()
  },
  apollo: {
    traccionDetalles: {
      prefetch: false,
      query: GetTraccionDetalleByIdTraccion,
      variables() {
        const where = {
          traccion: {
            id: this.traccion.id,
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.detalles=data.traccionDetalles
        }
      },
    },
  },
  props: {
    traccion: {
      required: true,
    },
  },
  components: {
    CardItem,
  },
};
</script>

