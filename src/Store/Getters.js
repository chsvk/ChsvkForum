import {countObjectProperties} from '@/utils/helpers'

export default {
    authUser(state){
        return state.authId? state.users[state.authId]: null 
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
}