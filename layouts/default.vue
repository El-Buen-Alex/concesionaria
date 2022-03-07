<template>
    <div>
        <Nav />
        <Nuxt/>
    </div>
</template>
<script>
export default {
    mounted(){
        if(process.client && localStorage.getItem("cartItem")){
            this.$store.commit("setCart", JSON.parse(localStorage.getItem("cartItem")))
        }
    }
}
</script>