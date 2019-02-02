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
    appendPostToThread(state, {postId, threadId}){
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser(state, {postId, userId}){
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    }
  }
})
