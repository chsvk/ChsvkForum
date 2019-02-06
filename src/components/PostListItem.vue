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
                      <template v-if="!editing">
                        <p>
                          {{post.text}}
                        </p>
                        <a @click="editing = true" style="margin-left: auto" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
                      </template>
                      <div v-else>
                          <post-editor
                            @save="editing = false"
                            @cancel="editing = false"
                            :post="post" />
                      </div>
                  </div>

                  <div class="post-date text-faded">
                      <div v-if="post.edited" class="edition-info">Edited</div>
                      <app-date :timeStamp="post.publishedAt"/>
                  </div>
              </div>
</template>

<script>
import moment from 'moment'
import PostEditor from './PostEditor'
import {countObjectProperties} from '@/utils/helpers'
export default {
    components: {
        PostEditor
    },
    props: {
        postId: {
            required: true,
            type: String
        }
    },
    data(){
        return{
            editing: false
        }
    },
    computed: {
        user(){
            return this.users[this.post.userId]
        },
        userReplies(){
            return countObjectProperties(this.user.posts);
        }, 
        post(){
            return this.$store.state.posts[this.postId]
        },
        users(){
            return this.$store.state.users
        }
    },
}
</script>

<style>

</style>
