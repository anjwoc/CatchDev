import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: false,
  imagePaths: [],
});
export const mutations = {
  addMainPost(state, payload){
    state.mainPosts.unshift(payload);
  },
  updateMainPost(state, payload) {
    const postIndex = state.mainPosts.findIndex(v => v.id === payload.id);
    Vue.set(state.mainPosts[postIndex], postIndex, payload);
  },
  removeMainPost(state, payload){
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  loadPost(state, payload){
    //배열 전체를 바꿔줌
    state.mainPosts = [payload];
  },
  loadPosts(state, payload){
    if(payload.reset) {
      state.mainPosts = payload.data;
    }else{
      //실수로 payload를 concat해서 lastPost가 10개의 배열 값이 들어가서 id값이 undefined로 찍혀서 실수
      state.mainPosts = state.mainPosts.concat(payload.data);
    }
    // true이면 10개를 가져와서 이후에도 더 불러올게 있다는 뜻이고
    // false이면 10미만이여서 더 이상 가져올게 없다는 의미
    state.hasMorePost = payload.data.length === 10;
  },
  loadComments(state, payload){
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    //post.id는 type이 Number인데 params.id로 바로 넘기면 String이 넘어오기때문에 서로 일치하지않아서
    //index를 찾지못해서 계속 에러발생
    Vue.set(state.mainPosts[index], 'Comments', payload.data);
  },
  updateToggleComment(state, payload){
    const commentIdx = state.mainPosts[0].Comments.findIndex(v => v.id === payload.commentId);
    Vue.set(state.mainPosts[0].Comments[commentIdx], 'updateOpened', !payload.updateOpened);
  },
  updateComment(state, payload){
    const index = state.mainPosts[0].Comments.findIndex(v => v.id === payload.id);
    state.mainPosts[index].Comments[index] = payload;
  },
  addComment(state, payload){
    //디비는 board이기때문에 용어를 통일시켜줘야함
    //postId와 boardId 용어 혼용으로 에러 발생
    const index = state.mainPosts.findIndex(v => v.id === payload.boardId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  deleteComment(state, payload){
    const postIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    const index = state.mainPosts[postIndex].Comments.findIndex(v => v.id === payload.id);
    state.mainPosts[postIndex].Comments.splice(index, 1);
  },
  unlikePost(state, payload){
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId);
    state.mainPosts[index].Likers.splice(userIndex, 1);
  },
  likePost(state, payload){
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Likers.push({
      id: payload.userId,
    });
  },
  updatePostStatus(state, payload){
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].status = payload.status;
  },

};


export const actions = {
  add({ commit, state }, payload){
    return this.$axios.post('/board', {
      title: payload.title,
      content: payload.content,
      hashtags: payload.hashtags,
      location: payload.location,
      category: payload.category,
      image: state.imagePaths
    }, {
      withCredentials: true,
    })
      .then((res)=> {
        commit('addMainPost', res.data);
        return res.data.id;
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  update({ commit, state }, payload){
    return this.$axios.post(`/board/${payload.id}/update`, {
      title: payload.title,
      content: payload.content,
      hashtags: payload.hashtags,
      tagHistory: payload.tagHistory,
      location: payload.location,
      category: payload.category,
      image: state.imagePaths
    }, {
      withCredentials: true,
    })
      .then((res)=> {
        commit('updateMainPost', res.data);
        return res.data.id;
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  remove({ commit }, payload){
    this.$axios.delete(`/board/${payload.postId}`, {
      withCredentials: true,
    })
      .then((res) => {
        commit('removeMainPost', payload);
      })
      .catch((err)=>{
        console.error(err);
      });
  },

  async addComment({ commit }, payload){
    await this.$axios.post(`/comment/${payload.postId}`,{
      postId: payload.postId,
      content: payload.content,
    },{
      withCredentials: true,
    })
      .then((res)=>{
        commit('addComment', res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  async deleteComment({ commit }, payload){
    await this.$axios.delete(`/comment/${payload.id}`,{
      data: {
        boardId: payload.postId
      }
    },{
      withCredentials: true,
    })
      .then((res) => {
        commit('deleteComment', {
          id : res.data,
          postId: payload.postId
        });
      })
  },
  async updateComment({ commit }, payload){
    await this.$axios.post(`/comment/update/${payload.commentId}`,{
      content: payload.content,
    },{
      withCredentials: true,
    })
      .then((res)=>{
        commit('updateComment', res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  async loadPost({ commit, state }, payload){
    try{
      const res = await this.$axios.get(`/board/${payload}`);
      commit('loadPost', res.data);
    }catch(err){
      console.error(err);
    }
  },
  async loadUpdatePost({ commit, state }, payload){
    try{
      const res = await this.$axios.get(`/board/history/${payload}`);
      commit('loadPost', res.data);
    }catch(err){
      console.error(err);
    }
  },
  async loadCategoryPosts ({ commit, state }, payload){
    try{
      let item = payload.item;
      if(payload && payload.reset) {
        const res = await this.$axios.get(`/boards/categoryPosts?item=${item}`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if(state.hasMorePost) {
        const lastPost  = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(`/boards/categoryPosts?item=${item}&lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    }catch(err){
      console.error(err);
    }
  },
  loadTrendingPosts: throttle(async function({ commit, state}, payload){
    try{
      if(payload && payload.reset) {
        const res = await this.$axios.get(`/boards/trendingBoards`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if(state.hasMorePost) {
        const lastPost  = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(`/boards?lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    }catch(err){
      console.error(err);
    }
  }, 2000),
  loadPosts: throttle(async function({ commit, state }, payload){
    try{
      if(payload && payload.reset) {
        const res = await this.$axios.get(`/boards`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if(state.hasMorePost) {
        const lastPost  = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(`/boards?lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    }catch(err){
      console.error(err);
    }

  }, 2000),
  async loadComments({ commit }, payload){
    await this.$axios.get(`/comment/${payload.postId}`)
      .then((res) => {
        commit('loadComments', {
          postId: payload.postId,
          data: res.data
        });
      })
      .catch(err=>{
        console.error(err);
      })
  },
  likePost({ commit }, payload){
    this.$axios.post(`/board/${payload.postId}/like`, {}, {
      withCredentials: true,
    })
      .then((res) => {
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  unlikePost({ commit }, payload){
    this.$axios.delete(`/board/${payload.postId}/like`, {
      withCredentials: true,
    })
      .then((res)=>{
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  updatePostStatus({ commit }, payload){
    this.$axios.post(`/board/${payload.postId}/status`,{
      status: payload.status,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('updatePostStatus',{
          postId: payload.postId,
          status: res.data,
        });
        
      })
  },
  async loadSearchPosts({ commit}, payload){
    if(payload && payload.reset) {
      const res = await this.$axios.get(`/boards/search/${payload.searchWord}`);
      commit('loadPosts', {
        data: res.data,
        reset: true,
      });
      return;
    }
    if(state.hasMorePost) {
      const lastPost  = state.mainPosts[state.mainPosts.length - 1];
      //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
      const res = await this.$axios.get(`/boards/search/${payload.searchWord}?lastId=${lastPost && lastPost.id}&limit=10`);
      commit('loadPosts', {
        data: res.data,
      });
      return;
    }

  }
  
  




};