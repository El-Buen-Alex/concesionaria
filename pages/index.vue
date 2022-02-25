<template>
  <div>
      <All-products :products="allProducts"/>
  </div>
</template>

<script >
import gql from 'graphql-tag'
import { mapGetters } from "vuex";
import AllProducts from '~/components/AllProducts.vue';
const ALL_CHARACTERS_QUERY = gql`
  query vehiculoimagens{
     vehiculoimagens{
      id
      url_imagen{
        id
        name
        url
      }
      vehiculoanio{
        id
        anio
        vehiculo{
          id
          modelo
          categoria{
            id
            name
          }
        }
      }
    }
  }
`;

export default  {
  components: { AllProducts },
  data(){
    return {
      vehiculoimagens:[], 
     
    }
  },
  mounted(){
    this.setProductsState()
  },
  methods: {
    setProductsState(){
      this.$store.commit('setProducts', this.vehiculoimagens)
    }
  },
  apollo: {
    vehiculoimagens: {
      query: ALL_CHARACTERS_QUERY,
      prefetch: true,
    },
  },
  computed:{
     ...mapGetters(["allProducts"]),
  }
}

</script>
