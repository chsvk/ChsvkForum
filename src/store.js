import Vue from 'vue'
import Vuex from 'vuex'

import Data from '@/Data'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...Data,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state){
      return state.users[state.authId]
    }
  },
  actions: {
    createPost({commit, state}, post){
      const postId = 'Chsvk' + Math.random();
      post['.key'] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now()/1000),
      commit('setPost', {postId, post});
      commit('appendPostToThread', {postId, threadId: post.threadId});
      commit('appendPostToUser', {postId, userId: post.userId });
      return Promise.resolve(state.posts[postId])
    },
    createThread({commit, state, dispatch}, {text, title, forumId}){

      return new Promise((resolve, reject)=> {
        const threadId = 'Chsvk' + Math.random();
        const userId = state.authId;
        const thread = {
          '.key': threadId,
          title,
          text,
          forumId,
          'publishedAt': Math.floor(Date.now()/1000),
          userId
        }
        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {forumId, threadId})
        commit('appendThreadToUser', {userId, threadId})
        dispatch('createPost', {text, threadId}).then(post => {
          commit('setThread', {threadId, thread:{...thread, firstPostId: post['.key']}})
        })

        resolve(state.threads[threadId])
      })
    },
    updateThread({commit, state, dispatch}, {text, title, threadId}){
      return new Promise((resolve, reject)=>{
        const thread = state.threads[threadId]
        const post = state.posts[thread.firstPostId]
        const newThread = {...thread, title}
        const newPost = {...post, text}
        commit('setThread', {thread: newThread, threadId: threadId})
        commit('setPost', {post: newPost, postId: thread.firstPostId})

        resolve(newThread)
      })
    },
    updateUser({commit}, user){
      commit('setUser', {userId: user['.key'], user})
    }
  },
  mutations: {
    setPost(state, {postId, post}){
      Vue.set(state.posts, postId, post)
    },
    setUser(state, {userId, user}){
      Vue.set(state.users, userId, user)
    },
    setThread(state, {threadId, thread}){
      Vue.set(state.threads, threadId, thread)
    },
    appendPostToThread(state, {postId, threadId}){
      const thread = state.threads[threadId];
      if(!thread.posts){
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser(state, {postId, userId}){
      const user = state.users[userId]
      if(!user.posts){
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId)
    },
    appendThreadToForum(state, {forumId, threadId}){
      const forum = state.forums[forumId]
      if(!forum.threads){
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    },  
    appendThreadToUser(state, {userId, threadId}){
      const user = state.users[userId]
      if(!user.threads){
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId)
    }
  }
})
