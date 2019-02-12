import firebase from 'firebase'

export default {

        createUser({state, commit}, {email, name, username, id, avatar = null}){
          return new Promise((resolve, reject)=> {
            const registeredAt = Math.floor(Date.now()/1000)
            const usernameLower = username.toLowerCase()
            email = email.toLowerCase()
            const user = {registeredAt, username, usernameLower, name, email, avatar}
            firebase.database().ref('users').child(id).set(user).then(()=>{
              commit('setItem', {resource: 'users', id, item: user})
              resolve(state.users[id]);
            })

          })
        },

        fetchAuthUser({dispatch, commit}){
          const userId = firebase.auth().currentUser.uid;
          return dispatch('fetchUser', {id: userId}).then(()=>{
            commit('setAuthId', {id: userId})
          })

        },


        registerUserWithEmailAndPassword({dispatch}, {email, name, username, avatar, password}){
          return firebase.auth().createUserWithEmailAndPassword(email, password).then((response)=>{
            console.log(response.user);
            dispatch('createUser', {email, name, username, avatar, id: response.user.uid})
          })
        },  


        loginUserWithEmailAndPassword({dispatch}, {email, password}){
          return firebase.auth().signInWithEmailAndPassword(email, password)
        },

        signOut({commit}){
          return firebase.auth().signOut().then(()=>{
            commit('setAuthId', undefined)
          })
        },


        createPost({commit, state}, post){
          const postId = firebase.database().ref().push().key
          post.userId = state.authId;
          post.publishedAt = Math.floor(Date.now()/1000)

          // Amazing stuff - > Can be used for future. Sending multiple updates to firebase at once

          const updates = {};

          updates[`posts/${postId}`] = post;
          updates[`threads/${post.threadId}/posts/${postId}`] = postId;
          updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId;
          updates[`users/${post.userId}/posts/${postId}`] = postId;

          firebase.database().ref().update(updates).then(()=>{
            commit('setItem', {resource: 'posts', id: postId, item: post});
            commit('appendPostToThread', {parentId: post.threadId, childId: postId});
            commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId});
            commit('appendPostToUser', {parentId: post.userId, childId: postId });
            return Promise.resolve(state.posts[postId])
          }).catch((err)=>{
            console.log(err.message);
          })
        },
        createThread({commit, state, dispatch}, {text, title, forumId}){
    
          return new Promise((resolve, reject)=> {
            const threadId = firebase.database().ref('threads').push().key
            const postId = firebase.database().ref('posts').push().key
            const userId = state.authId;
            const publishedAt = Math.floor(Date.now()/1000)
            const thread = {
              title,
              text,
              forumId,
              publishedAt,
              userId,
              firstPostId: postId,
              posts: {}
            }
            thread.posts[postId] = postId
            const post = {
              text,
              publishedAt,
              threadId,
              userId
            }

            const updates = {};
            

            updates[`threads/${threadId}`] = thread;
            updates[`forums/${forumId}/threads/${threadId}`] = threadId
            updates[`users/${userId}/posts/${threadId}`] = threadId
            updates[`posts/${postId}`] = post;
            updates[`users/${post.userId}/posts/${postId}`] = postId;


            firebase.database().ref().update(updates).then(()=>{
              commit('setItem', { resource: 'threads', id: threadId, item: thread})
              commit('appendThreadToForum', {parentId: forumId, childId: threadId})
              commit('appendThreadToUser', {parentId: userId, childId: threadId})

              commit('setItem', {resource: 'posts', id: postId, item: post});
              commit('appendPostToThread', {parentId: post.threadId, childId: postId});
              commit('appendPostToUser', {parentId: post.userId, childId: postId })
               
              resolve(state.threads[threadId])
            }).catch((err)=>{
              console.log(err.message);
            })
          })
        },
        updateThread({commit, state, dispatch}, {text, title, threadId}){
          return new Promise((resolve, reject)=>{
            const thread = state.threads[threadId]
            const post = state.posts[thread.firstPostId]

            const edited = {
              at: Math.floor(Date.now()/1000),
              by: state.authId
            }
            const updates = {}
            updates[`posts/${thread.firstPostId}/text`] = text;
            updates[`posts/${thread.firstPostId}/edited`] = edited;
            updates[`threads/${threadId}/title`] = title;

            firebase.database().ref().update(updates).then(()=>{
               commit('setPost', {postId : thread.firstPostId, post: {...post, text, edited,}})
               commit('setThread', {thread: {...thread, title}, threadId: threadId})
               resolve(post);
            }) 
          })
        },
        updatePost({state,commit}, {postId, text}){
          return new Promise((resolve, reject)=>{
             const post = state.posts[postId]
             const edited = {
               at: Math.floor(Date.now()/1000),
               by: state.authId
             }
             const updates = {text, edited}
             firebase.database().ref('posts').child(postId).update(updates).then(()=>{
                commit('setPost', {postId, post: {...post, text, edited,}})
                resolve(post);
             }) 
          })
        },  
        updateUser({commit}, user){
          commit('setUser', {userId: user['.key'], user})
        },

        fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {id, emoji: '🏷', resource: 'categories'}),
        fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {id, emoji: '🔖', resource: 'forums'}),
        fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {id, emoji: '📃', resource: 'threads'}),
        fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {id, emoji: '👩🏻‍💻', resource: 'users'}),
        fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {id, emoji: '📬', resource: 'posts'}),

        fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, emoji: '📬📬', resource: 'posts'}),
        fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, emoji: '🔖🔖', resource: 'forums'}),
        fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, emoji: '🔖🔖', resource: 'threads'}),
        fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, emoji: '🔖🔖', resource: 'categories'}),
        fetchUsers: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, emoji: '🔖🔖', resource: 'users'}),

        fetchAllCategories({state, commit, dispatch}){
          return new Promise((resolve, reject)=> {
            console.log('🔥base', '🏷', 'all');
            firebase.database().ref('categories').once('value', snapshot=> {
              const categoryObject = snapshot.val()
              Object.keys(categoryObject).forEach(categoryId => {
                const category = categoryObject[categoryId];
                commit('setItem', {resource: 'categories', id: categoryId, item: category})
              })
              resolve(Object.values(state.categories))
            })
          })
        },
        fetchItem({state,commit}, {id, emoji, resource}){
          console.log('🔥base',  emoji, id);
          return new Promise((resolve, reject)=> {
            firebase.database().ref(resource).child(id).once('value', snapshot=> {
              commit('setItem', {resource, id : snapshot.key, item: snapshot.val()})
              resolve(state[resource][id]);
            })
          })
        },
        fetchItems({dispatch}, {ids, emoji, resource}){
            ids = Array.isArray(ids)? ids: Object.keys(ids);
            return Promise.all(ids.map( id => dispatch('fetchItem', {id, emoji, resource})))
        }
}