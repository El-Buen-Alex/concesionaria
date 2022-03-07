<template>
  <div class="flex justify-center my-5">
    <div v-if="$apollo.loading">Loading..-</div>
    <div v-else class="w-5/6">
      <div class="flex">
        <div class="w-1/2 px-3">
          <ShowProduct :vehiculoInformation="vehiculoSelected" />
        </div>
        <div class="w-1/2 px-3">
          <NuxtChild></NuxtChild>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import findVehiculoQery from "~/apollo/findVehiculoInformation";
import ShowProduct from "../../components/ShowProduct.vue";
export default {
  data() {
    return {
      id: {
        type: Number,
      },
      vehiculoimagen: [],
    };
  },
  apollo: {
    vehiculoimagen: {
      prefetch: false,
      query: findVehiculoQery,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      result({ data, loading }) {
        if (!loading) {
          console.log("uhmm",data.vehiculoimagen)
          this.$store.commit("setVehiculoSelected", data.vehiculoimagen);
          if(process.client){ 
            localStorage.setItem("vehiculoSelected", JSON.stringify(data.vehiculoimagen))
          }
        }
      },
    },   
  },
  created() {
    this.activeCanPersonalizarLink();
  },
  methods: {
    activeCanPersonalizarLink() {
      this.$store.commit("setCanPersonalice", true);
    },
   
  },
  computed: {
    ...mapGetters(["vehiculoSelected"]),
  },
  components: {
    ShowProduct,
  },
};
</script>