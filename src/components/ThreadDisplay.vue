<template>
     <div class="col-large push-top">
            <h1>{{thread.title}}</h1>
            <p class="text-faded text-xsmall">
              By <a href="#">{{users[thread.userId].name}}</a>, <app-date :timeStamp="thread.publishedAt"/>
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
        }
    }
}
</script>

<style>

</style>
