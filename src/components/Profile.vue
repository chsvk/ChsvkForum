<template>
<div class="profile">
    <div class="flex-grid">
          
        <profile-card
            v-if="!edit"
            :user="user"
         />

         <profile-card-edit
            v-else
            :user="user"
        />


          <div class="col-7 push-top">

              <div class="profile-header">
                  <span class="text-lead">
                      {{user.username}}'s recent activity
                  </span>
                  <a href="#">See only started threads?</a>
              </div>

              <hr>
            <post-list :posts="userPosts"/>
          </div>
      </div>

  </div>

</template>

<script>
import PostList from './PostList'
import ProfileCard from './ProfileCard'
import ProfileCardEdit from './ProfileCardEdit'
import {mapGetters} from 'vuex'
// import store from '@/Store/store'
export default {
    props: {
        edit: {
            type: Boolean,
            default: false
        }
    },
    components: {
        PostList,
        ProfileCard,
        ProfileCardEdit
    },
    computed: {
        ...mapGetters({
            user: 'authUser'
        }),
        userPosts(){
            return this.user.posts 
            ? Object.keys(this.user.posts)
            : []
        }
    },
    //  The commented methods have been shifted to router.js file.
    // beforeRouteEnter(to, from, next){
    //     if(store.state.authId){
    //         next()
    //     }else{
    //         next('/')
    //     }
    // },
    beforeRouteUpdate(to, from, next){

    },
    beforeRouteLeave(to, from, next){

    }
}
</script>

<style>

</style>
