<template>
    <div class="flex justify-center">
        <div class="w-5/6  bg-black ">
            <div class="flex">
                <div v-for="carro in products" :key="carro.id" class="w-1/5 px-2">
                    <NuxtLink :to="`/products/${carro.id}`">
                        <div class="bg-white rounded-lg shadow-md w-full ">
                        <img :src="'http://localhost:1337'+carro.url_imagen.url" :alt="carro.url_imagen.name" srcset="">
                        <p class="w-full fw-bold">{{carro.vehiculoanio.vehiculo.modelo}}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        products:{
            type:Array,
            required:true
        }
    }


}
</script>