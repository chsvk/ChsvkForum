import Vue from 'vue'

const appendChildToParentMutation = ({parent, child})=>  (state, {childId, parentId})=> {
    const resource = state[parent][parentId];
    if(!resource[child]){
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default {
    setPost(state, {postId, post}){
        Vue.set(state.posts, postId, post)
      },
      setUser(state, {userId, user}){
        Vue.set(state.users, userId, user)
      },
      setThread(state, {threadId, thread}){
        Vue.set(state.threads, threadId, thread)
      },
  
      setItem(state, {id, item, resource}){
        item['.key'] = id;
        Vue.set(state[resource], id, item )
      },
      appendPostToThread: appendChildToParentMutation({parent: 'threads', child: 'posts'}),

      appendContributorToThread: appendChildToParentMutation({parent: 'threads', child: 'contributors'}),
  
      appendPostToUser: appendChildToParentMutation({parent: 'users', child: 'posts'}),
  
      appendThreadToForum: appendChildToParentMutation({parent: 'forums', child: 'threads'}),  
  
      appendThreadToUser: appendChildToParentMutation({parent: "users", child: 'threads'})
}