<template>
  <div class=" w-full py-3 px-8 bg-white shadow-lg rounded-lg my-2" v-if="kitObject">
  <div>
    <h2 class="text-gray-800 text-xl font-semibold">{{kitObject.name}}</h2>
    <p class="mt-2 text-gray-600">{{kitObject.precio}}</p>
  </div>
  <div class="flex justify-end mt-2">
        <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" :checked="setCheckInput" @click="addOrRemoveElement"><span class="ml-2 text-gray-700">Add</span>
        </label>
    
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            setCheckInput:{
                type:Boolean,
            }
        }
    },
    mounted(){
        this.findItem(this.kitObject, 'KIT')
    },
    methods:{
        addOrRemoveElement(e){
            this.$emit('addOrRemoveKit', e.target.checked, this.kitObject)
        },
        findItem(accesorio, campo){
            const idUnique=accesorio.id+campo
            let result=false
            this.getCart.forEach((item)=>{
                console.log(item)
                if(item.idUnique===idUnique){
                    result= true
                }
            })
            this.setCheckInput=result
        }
    },
    props: {
        kitObject:{
            required:true
        }
    },
     computed: {
        ...mapGetters(["getCart"])
    }
}
</script>

