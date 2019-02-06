<template>
    <div class="col-full push-top">

          <h1>Editing <i>{{thread.title}}</i></h1>

          <thread-editor
            :title="thread.title"
            :text="text"
            @save="save" @cancel="cancel" />
      </div>
</template>

<script>
import ThreadEditor from './ThreadEditor'
export default {
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
            return this.$store.state.posts[this.thread.firstPostId].text
        }
    },
    methods: {
        save({title, text}){
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
 