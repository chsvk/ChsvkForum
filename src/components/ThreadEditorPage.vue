<template>
    <div v-if="dataStatus_ready" class="col-full push-top">

          <h1>Editing <i>{{thread.title}}</i></h1>

          <thread-editor
            :title="thread.title"
            :text="text"
            @save="save" @cancel="cancel" />
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
        id: {
            required: true,
            type: String
        }
    },
    computed:{
        thread(){
            return this.$store.state.threads[this.id]
        },
        text(){
            const post = this.$store.state.posts[this.thread.firstPostId]
            return post? post.text: null
        }
    },
    created(){
        var vm = this;
        this.$store.dispatch('fetchThread', {id: this.id}).then(thread => {
            console.log(thread.firstPostId)
            this.$store.dispatch('fetchPost', {id: thread.firstPostId}).then(()=>{
                vm.dataStatus_fetched();
            })
        })
    },
    methods: {
        save({title, text}){
            var vm = this;
            // Dispatch Action in Store to create new Thread
            this.$store.dispatch('updateThread', {text, title, threadId: this.id}).then((thread)=>{
                this.$router.push({
                    name: 'ThreadDisplay',
                    params: {
                        id: vm.id
                    }
                })
            })
        },
        cancel(){
            var vm = this;
            this.$router.push({
                    name: 'ThreadDisplay',
                    params: {
                        id: vm.id
                    }
                })
        }
    },
    
}
</script>

<style>

</style>
 