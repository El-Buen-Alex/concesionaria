<template>
    <div class="h-screen">
        <div class="h-1/6 bg-current">
            <Nav  />
        </div>
       <div >
           
                <Nuxt/>
       </div>
       <div class="h-1/6 bg-current">

       </div>
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