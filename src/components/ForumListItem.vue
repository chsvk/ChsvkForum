<template>
    <div v-if="forum" class="forum-listing">
                  <div class="forum-details">
                      <router-link :to="{name: 'Forums', params: {id: forum['.key']}}" class="text-xlarge">{{forum.name}}</router-link>
                      <p>{{forum.description}}</p>
                  </div>

                  <div class="threads-count">
                      <p><span class="count">{{threadCount}}</span> {{threadCount=== 1? 'thread': 'threads'}}</p>
                  </div>

                  <div class="last-thread">
                      <!-- <img class="avatar" src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Frah?alt=media&token=7ad21914-a4f4-4ad0-add6-17e6d3ae9679" alt="">
                      <div class="last-thread-details">
                          <a href="thread.html">Post Reactions</a>
                          <p class="text-xsmall">By <a href="profile.html">Rolf Haug</a>, a month ago</p>
                      </div> -->
                  </div>
              </div>
</template>

<script>
import {countObjectProperties} from '@/utils/helpers'
export default {
    props: {
        forumId: {
            required: true,
            type: String
        }
    },
    computed: {
        threadCount(){
            return countObjectProperties(this.forum.threads)
        },
        forum(){
            return this.$store.state.forums[this.forumId]
        }
    }
}
</script>

<style>

</style>
