<template>
  <div class="w-1/2 px-1" v-if="motor && motorSelected">
    <CardItem
      :name="motor.especificacion"
      :checked="motor.id == motorSelected.id"
      :detalles="detalles"
      :nameInput="'motores'"
      v-on:selectItem="addItem"
    />
  </div>
</template>

<script>
import GetMotorDetalleByIdMotor from "~/apollo/GetMotorDetalleByIdMotor";
import CardItem from "../../wrapers/CardItem.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      detalles: [],
    };
  },
  mounted() {
    this.$apollo.queries.motorDetalles.start();
  },
  methods: {
    addItem() {
      this.$emit("addItem", this.motorSelected, {
        cartItem: this.motor,
        campo: "motor",
      });
      this.$store.commit("setMotorSelected", this.motor);
    },
  },
  apollo: {
    motorDetalles: {
      prefetch: false,
      query: GetMotorDetalleByIdMotor,
      variables() {
        const where = {
          motor: {
            id: this.motor.id,
          },
        };
        return {
          where: where,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          this.detalles = data.motorDetalles;
        }
      },
    },
  },
  props: {
    motor: {
      required: true,
    },
  },
  components: {
    CardItem,
  },
  computed: {
    ...mapGetters(["motorSelected"]),
  },
};
</script>
