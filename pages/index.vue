<template>
  <div class="my-2">
    <All-products
      v-for="category in categories"
      :key="category.id"
      :category="category" 
    />
  </div>
</template>

<script >
import gql from "graphql-tag";
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
    if(process.client){
      
    }
  },
  methods: {},
  apollo: {
    categorias: {
      prefetch: false,
      query: GetCategorias,
      result({ data, loading }) {
        if (!loading) {
          this.$store.commit("setCategories", data.categorias);
        }
      },
    },
  },
  computed: {
    ...mapGetters(["categories"]),
  },
};
</script>
