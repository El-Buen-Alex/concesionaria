<template>
  <div class="my-2" v-if="this.categories.length>0">
    <All-products
      v-for="category in categories"
      :key="category.id"
      :category="category" 
    />
  </div>
</template>

<script >
import { mapGetters } from "vuex";
import AllProducts from "~/components/AllProducts.vue";
import GetCategorias from "~/apollo/getCategorias";

export default {
  layout: "concesionaria",

  components: { AllProducts },
  data() {
    return {
      vehiculoimagens: [],
    };
  },
  mounted() {
  },
  methods: {},
  apollo: {
    categorias: {
      prefetch: false,
      query: GetCategorias,
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setCategories", data.categorias);
          console.log(data.categorias)
        }
      },
    },
  },
  computed: {
    ...mapGetters(["categories"]),
  },
};
</script>
