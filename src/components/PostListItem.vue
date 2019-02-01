<template>
    <div class="post">
                  <div class="user-info">
                      <a href="#" class="user-name">{{user.name}}</a>

                      <a href="#">
                          <img class="avatar-large" :src="user.avatar" alt="">
                      </a>

                      <p class="desktop-only text-small">{{userReplies}} Replies</p>
                  </div>

                  <div class="post-content">
                      <div>
                        <p>
                          {{posts[postId].text}}
                        </p>
                      </div>
                  </div>

                  <div class="post-date text-faded">
                      <app-date :timeStamp="posts[postId].publishedAt"/>
                  </div>
              </div>
</template>

<script>
import moment from 'moment'
import {countObjectProperties} from '@/utils/helpers'
export default {
    props: {
        postId: {
            required: true,
            type: String
        }
    },
    computed: {
        user(){
            return this.users[this.posts[this.postId].userId]
        },
        userReplies(){
            return countObjectProperties(this.user.posts);
        }, 
        posts(){
            return this.$store.state.posts
        },
        users(){
            return this.$store.state.users
        }
    },
}
</script>

<style>

</style>
