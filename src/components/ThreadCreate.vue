<template>
    <div v-if="dataStatus_ready" class="col-full push-top">

          <h1>Create new thread in <i>{{forum.name}}</i></h1>

          <thread-editor @save="save" @cancel="cancel" />
      </div>
</template>

<script>
import ThreadEditor from './ThreadEditor'
import DataStatus from '@/Mixins/DataStatus'
export default {
    mixins: [DataStatus],
    components:{
        ThreadEditor
    },
    props: {
        forumId: {
            required: true,
            type: String
        }
    },
    created(){
        this.$store.dispatch('fetchForum', {id: this.forumId}).then(()=>{
            this.dataStatus_fetched();
        })
    },
    methods: {
        save({title, text}){
            // Dispatch Action in Store to create new Thread
            this.$store.dispatch('createThread', {text, title, forumId: this.forum['.key']}).then((thread)=>{
                this.$router.push({
                    name: 'ThreadDisplay',
                    params: {
                        id: thread['.key']
                    }
                })
            })
        },
        cancel(){
            this.$router.push({
                name: 'Forums',
                params: {
                    id: this.forum['.key']
                }
            })
        }
    },
    computed:{
        forum(){
            return this.$store.state.forums[this.forumId]
        }
    }
}
</script>

<style>

</style>
