<template>
  <div v-if="kits" class="mt-5">
      <Kit v-for="kit in kits" :key="kit.id" :kitObject="kit" v-on:addOrRemoveKit="addOrRemoveKit" />
  </div>
</template>

<script>
import Kit from './cards/kit.vue'
export default {
    mounted(){
        console.log(this.kits)
    },
    methods:{
        addOrRemoveKit(accion, kit){
            this.$emit('addOrEditAccesorio', accion, kit, 'KIT')
        },
        
    },
    props: {
        kits:{
            required:true
        }
    },
    components: {
        Kit
    }
}
</script>

