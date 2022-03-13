<template>
  <div class="w-full flex mt-5">
    <div class="w-1/3 px-1">
      <button @click="prev" class="w-full bg-red-600 font-bold text-white rounded-sm overflow-hidden py-1">Atras</button>
    </div>
    <div class="w-2/3 px-2">
      <button class="w-full bg-green-600 font-bold text-white rounded-sm overflow-hidden py-1" @click="next">Siguiente</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$emit("next");
    },
    prev() {
      this.$emit("prev");
    },
  },
};
</script>

<style>
</style>