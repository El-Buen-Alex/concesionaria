<template>
  <div>
    <input
      type="radio"
      :id="detalles.id"
      :name="nameInput"
      @click="selectMotor()"
      :checked="checked"
    />
    <div class="max-w-sm rounded overflow-hidden shadow-lg h-64">
      <div class="font-bold text-xl mb-2 text-center">{{ name }}</div>
      <div class="px-6 py-4">
        <p
          class="text-gray-700 text-base"
          v-for="detalle in detalles"
          :key="detalle.id"
        >
          {{ detalle.detalle }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
      selectMotor(){
          this.$emit('selectItem')
      }
  },
  mounted() {
      console.log(this.detalles)
  },
  props: {
    detalles: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nameInput: {
      type: String,
    },
    checked:{
      type:Boolean
    }
  },
};
</script>