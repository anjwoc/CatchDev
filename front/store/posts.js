import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: false,
  imagePaths: [],
  lastId: 0,
});
export const mutations = {
  addMainPost(state, payload){
    state.mainPosts.unshift(payload);
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  setLastId(state, payload){
    state.lastId = payload;
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
};

export const actions = {
  add({ commit, state }, payload){
    this.$axios.post('/board', {
      title: payload.title,
      content: payload.content,
      location: payload.location,
      category: payload.category,
      image: state.imagePaths
    }, {
      withCredentials: true,
    })
      .then((res)=> {
        commit('addMainPost', res.data);
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  async loadPost({ commit, state }, payload){
    try{
      console.log("loadPost 페이로드");
      console.log(payload);
      const res = await this.$axios.get(`/board/${payload}`);
      commit('loadPost', res.data);
    }catch(err){
      console.error(err);
    }
  },
  loadPosts: throttle(async function({ commit, state }, payload){
    console.log('loadPosts');
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
  likePost({ commit }, payload){
    this.$axios.post(`/board/${payload.postId}/like`, {}, {
      withCredentials: true,
    })
      .then((res) => {
        console.log('likePost');
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
        console.log('unlikePost');
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err)=>{
        console.error(err);
      })

  },
  




};