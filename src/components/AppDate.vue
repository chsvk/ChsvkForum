<template>
    <span :title="readableDate">{{timeStamp | differenceFromNow}}</span>
</template>

<script>
import moment from 'moment'
export default {
    props: 
        {
            timeStamp: {
                required: true,
                type: Number
            }
        },
    computed: {
        readableDate(){
            return moment.unix(this.timeStamp).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    filters: {
        differenceFromNow(date){
            return moment.unix(date).fromNow()
        }
    }
    
}
</script>

<style>

</style>
