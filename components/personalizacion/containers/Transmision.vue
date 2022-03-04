<template>
  <div class="w-1/2 px-1" v-if="detalles.length > 0">
    <CardItem
      :name="transmision.tipotransmision.tipo"
      :checked="transmision.id == transmisionSelected.id"
      :detalles="detalles"
      :nameInput="'transmisiones'"
       v-on:selectItem="addItem"
    />
  </div>
</template>

<script>
import CardItem from "../../wrapers/CardItem.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      detalles: [],
    };
  },
  mounted() {
    this.detalles.push(this.transmision);
  },
  methods: {
    addItem() {
      this.$emit("addItem", this.transmisionSelected, {
        cartItem: this.transmision,
        campo: "transmision",
      });
      this.$store.commit("setTransmisionSelected", this.transmision);
    },
  },
  props: {
    transmision: {
      required: true,
    },
  },
  components: {
    CardItem,
  },
  computed: {
    ...mapGetters(["transmisionSelected"]),
  },
};
</script>

