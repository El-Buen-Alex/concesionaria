<template>
  <div class="w-1/2 px-1" v-if="detalles.length > 0">
    <CardItem
      :name="traccion.tipotraccion.tipo"
      :checked="traccion.id == traccionSelected.id"
      :detalles="detalles"
      :nameInput="'tracciones'"
      v-on:selectItem="addItem"
    />
  </div>
</template>

<script>
import CardItem from "../../wrapers/CardItem.vue";
import GetTraccionDetalleByIdTraccion from "~/apollo/GetTraccionDetalleByIdTraccion";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      detalles: [],
    };
  },
  mounted() {
    this.$apollo.queries.traccionDetalles.start();
  },
   methods: {
    addItem() {
      this.$emit("addItem", this.traccionSelected, {
        cartItem: this.traccion,
        campo: "traccion",
      });
      this.$store.commit("setTraccionSelected", this.traccion);
    },
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
          this.detalles = data.traccionDetalles;
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
  computed: {
    ...mapGetters(["traccionSelected"]),
  },
};
</script>

