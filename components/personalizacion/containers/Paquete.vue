<template>
  <div class="w-1/2 px-1" v-if="paquete && paqueteSelected">
    <CardItem
      :name="paquete.name"
      :checked="paquete.id == paqueteSelected.id"
      :detalles="detalles"
      :nameInput="'paquetes'"
      v-on:selectItem="addItem"
    />
  </div>
</template>

<script>
import GetPaqueteDetalleByIdPaquete from '~/apollo/GetPaqueteDetalleByIdPaquete'
import CardItem from "../../wrapers/CardItem.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      detalles: [],
    };
  },
  methods: {
    addItem() {
      this.$emit("addItem", this.paqueteSelected, {
        cartItem: this.paquete,
        campo: "paquete",
      });
      this.$store.commit("setPaqueteSelected", this.paquete);
    },
  },
  apollo: {
    paqueteDetalles:{
            prefetch: false,
            query: GetPaqueteDetalleByIdPaquete,
            variables() {
                const where={
                     "paquete":{
                        "id":this.paquete.id
                    }
                }
                return {
                where: where,
                };
            },
            result({ data, loading }) {
                if (!loading) {
                    this.detalles=data.paqueteDetalles
                }
            },
        },
  },
  props: {
    paquete: {
      required: true,
    },
  },
  components: {
    CardItem,
  },
  computed: {
    ...mapGetters(["paqueteSelected"]),
  },
};
</script>
