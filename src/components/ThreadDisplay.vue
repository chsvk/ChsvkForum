<template>
     <div v-if="!loading" class="col-large push-top">
            <h1>{{thread.title}}</h1>
            <router-link
                :to="{name: 'ThreadEditorPage', threadId: this.id}"
                class="btn-green btn-small"
                tag="button"
            > Edit Thread </router-link>
            <p class="text-faded text-xsmall">
                By <a href="#">{{userName}}</a>, <app-date :timeStamp="thread.publishedAt"/>
                <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributors}} {{contributors>1? 'Contributors': 'Contributor'}}</span>
            </p>
            <post-list :posts="Object.values(threads[id].posts)"/>
            <post-editor :id="id"/>
      </div>
</template>

<script>  
import PostList from './PostList'
import PostEditor from './PostEditor'
import {countObjectProperties} from '@/utils/helpers'
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    data(){
        return{

        }
    },
    components: {
        PostList,
        PostEditor
    },
    created(){
        var vm = this;
        // fetching threads
            this.$store.dispatch('fetchThread', {id: this.id}).then(thread=>{
                this.$store.dispatch('fetchUser', {id: thread.userId})
                this.$store.dispatch('fetchPosts', {ids: Object.keys(thread.posts)}).then((posts)=>{
                    posts.forEach(post => {
                        this.$store.dispatch('fetchUser', {id: post.userId})
                        vm.loading = false;
                    })
                })
            })
    },
    data(){
        return{
            loading: true,
            threads: this.$store.state.threads,
            posts: this.$store.state.posts,
            users: this.$store.state.users
        }
    },
    computed: {
        thread(){
            return this.$store.state.threads[this.id]
        },
        repliesCount(){
            return this.$store.getters.threadRepliesCount(this.thread['.key']);
        },
        contributors(){
            console.log(countObjectProperties(this.thread.contributors))
            return countObjectProperties(this.thread.contributors);
        },
        userName(){
            return (this.$store.state.users[this.thread.userId].name)
        },
    
    }
}
</script>

<style>

</style>
