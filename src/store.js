import Vue from 'vue'
import Vuex from 'vuex'

import {countObjectProperties} from '@/utils/helpers'

import Data from '@/Data'
Vue.use(Vuex)

const appendChildToParentMutation = ({parent, child})=>  (state, {childId, parentId})=> {
    const resource = state[parent][parentId];
    if(!resource[child]){
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }


export default new Vuex.Store({
  state: {
    ...Data,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state){
      return state.users[state.authId]
    },
    userPostCount(state){
      return (id)=> {
        return countObjectProperties(state.users[id].posts)
      }
    },
    userThreadCount(state){
      return (id)=> {
        return countObjectProperties(state.users[id].threads)
      }
    },
    threadRepliesCount(state){
      return (id)=> {
        return countObjectProperties(state.threads[id].posts) - 1;
      }
    },
    contributorsCount: state => id => {
      const thread = state.threads[id]
      const replies = Object.keys(thread.posts).filter(postId => postId !== thread.firstPostId)
      .map(postId => state.posts[postId])
      const userIds = replies.map(post => post.userId)
      return userIds.filter((item, index)=> index === userIds.indexOf(item)).length
    }

  },
  actions: {
    createPost({commit, state}, post){
      const postId = 'Chsvk' + Math.random();
      post['.key'] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now()/1000),
      commit('setPost', {postId, post});
      commit('appendPostToThread', {parentId: post.threadId, childId: postId});
      commit('appendPostToUser', {parentId: post.userId, childId: postId });
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
        commit('appendThreadToForum', {parentId: forumId, childId: threadId})
        commit('appendThreadToUser', {parentId: userId, childId: threadId})
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
    updatePost({state,commit}, {postId, text}){
      return new Promise((resolve, reject)=>{
         const post = state.posts[postId]
         commit('setPost', {
          postId: postId,
          post: {...post, text,
          edited: {
            at: Math.floor(Date.now()/1000),
            by: state.authId 
          }
        }
        })
         resolve(post);
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
    appendPostToThread: appendChildToParentMutation({parent: 'threads', child: 'posts'}),

    appendPostToUser: appendChildToParentMutation({parent: 'users', child: 'posts'}),

    appendThreadToForum: appendChildToParentMutation({parent: 'forums', child: 'threads'}),  

    appendThreadToUser: appendChildToParentMutation({parent: "users", child: 'threads'})
  }
})
