<template>
  <div>
      hol
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    
    mounted() {
        console.log("jijija",this.motores)
    },
    computed: {
        ...mapGetters(["motores","transmisiones"]),
    }
}
</script>

<style>

</style>