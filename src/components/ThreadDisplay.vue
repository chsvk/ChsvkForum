<template>
     <div class="col-large push-top">
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
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    components: {
        PostList,
        PostEditor
    },
    data(){
        return{
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
            return this.$store.getters.contributorsCount(this.thread['.key'])
        },
        userName(){
            return this.$store.state.users[this.thread.userId].name
        }
    }
}
</script>

<style>

</style>
