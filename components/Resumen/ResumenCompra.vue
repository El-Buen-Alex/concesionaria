<template>
  <div class="w-full">
    <img
      class="w-full max-h-full"
      :src=" vehiculoSelected.url_imagen.url"
      alt="vehiculo Seleccionado"
    />
    <div>
      <button
        class="
          text-white
          bg-gray-700
          text-center
          font-bold
          text-2xl
          w-full
          rounded-sm
        "
        @click="changeVisibility"
      >
        {{ complmento }}
      </button>
    </div>
    <Transition>
      <div class="min-h-72" v-if="showResumen"><CartComponent/></div>
    </Transition>
  </div>
</template>

<script>
import CartComponent from '~/components/cart/cartComponent.vue';
export default {
  data() {
    return {
      showResumen: false,
      complmento: "SHOW MORE",
    };
  },
  methods: {
    changeVisibility() {
      this.showResumen = !this.showResumen;
      if (this.showResumen) {
        this.complmento = "SHOW LESS";
      } else {
        this.complmento = "SHOW MORE";
      }
    },
  },
  props: {
    vehiculoSelected: {
      type: Object,
      required: true,
    },
  },
  computed: {
    RouteServer() {
      return process.env.baseUrl;
    },
  },
  components:{
    CartComponent
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>