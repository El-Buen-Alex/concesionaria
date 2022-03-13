<template>
    <div class="h-screen">
        <div class="header bg-current ">
            <Nav  />
        </div>
       <div class="main" >
                <Nuxt/>
       </div>
       <div class="footer bg-current">
       <div class="h-full text-white">a</div>
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
<style scoped>
.header{
    height: 25%;
}
.main{
    min-height: 60%;
    display: flex;
    justify-content:center;
    align-items:center;
}
.footer{
    height:15%;
}
@media (min-width: 1024px) {
    .header{
    height: 16%;
    }
    .main{
        min-height: 68%;
    }
    .footer{
    height:16%;
}
}
</style>