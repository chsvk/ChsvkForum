<template>
    <div class="threadList">
        <div class="thread-list">
            <h2 class="list-title">Threads</h2>
            <thread-list-item v-for="thread in ThreadList" :thread="thread" :key="thread['.key']"/>          
          </div>
    </div>
</template>

<script>
import ThreadListItem from './ThreadListItem'
export default {
    props: {
        ThreadList: {
            required: true,
            type: Array
        }
    },
    components: {
        ThreadListItem
    },
    mounted(){
       console.log(this.ThreadList); 
    }
}
</script>

<style>

</style>
