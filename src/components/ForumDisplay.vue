<template>
     <div class="forum_wrapper">
      <div class="col-full push-top">  
          <div class="forum-header">
              <div class="forum-details">
                  <h1>{{forum.name}}</h1>
                  <p class="text-lead">{{forum.description}}</p>
              </div>
              <router-link class="btn-green btn-small" :to="{name: 'ThreadCreate', params: {forumId: this.forum['.key']}}">Start a Thread</router-link>
          </div>
      </div>
        <thread-list :ThreadList="threads"/>
     </div>
</template>

<script>
import ThreadList from './ThreadList'
export default {
    components: {
        ThreadList
    },
    props: {
        id: {
            required: true,
            type: String
        }
    },
    computed:{
        forum(){
            return this.$store.state.forums[this.id]
        },
        threads(){
            return Object.values(this.$store.state.threads).filter(thread => thread.forumId === this.id)
        }
    }
}
</script>

<style scoped>
    .forum_wrapper{
        width: 100%;
    }
</style>
