<template>
    <div>
        {{vehiculoimagen}}
    </div>
</template>
<script>
import findVehiculoQery from '~/apollo/findVehiculoInformation'
export default {
      data() {
        return {
            id:{
                type:Number
            },
            vehiculoimagen:[]
        }
    },
    apollo:{
        vehiculoimagen:{
            prefetch:true,
            query:findVehiculoQery,
            variables(){
                return {
                    id:this.$route.params.id
                }
            }
        }
    },
    created(){
        
    }
}
</script>