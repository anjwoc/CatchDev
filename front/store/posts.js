import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],

});
export const mutations = {
  addMainPost(state, payload){
    state.mainPosts.unshift(payload);
  },
  concatImagePaths(state, payload) {
    console.log(`현재 이미지: ${state.imagePaths}`)
    state.imagePaths = state.imagePaths.concat(payload);
    console.log(`합친 후 이미지: ${state.imagePaths}`)
  },
  loadPost(state, payload){
    state.mainPosts = [payload];
  },
  loadPosts(state, payload){
    if(payload.reset) {
      state.mainPosts = payload.data;
    }else{
      state.mainPosts = state.mainPosts.concat(payload);
    }
    // true이면 10개를 가져와서 이후에도 더 불러올게 있다는 뜻이고
    // false이면 10미만이여서 더 이상 가져올게 없다는 의미
    state.hasMorePost = payload.data.length === 10;
  }
};

export const actions = {
  add({ commit, state }, payload){
    console.log(`페이로드: ${payload}`);
    console.log(payload);
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
        console.log("통과")
        console.log(`res: ${res.data}`)
        commit('addMainPost', res.data);
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  async loadPost({ commit, state }, payload){
    try{
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
        const res = await this.$axios.get(`/test`);
        console.log(`loadPosts 결과: ${res.data}`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if(state.hasMorePost) {
        const lastPost  = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(`/test/lastId=${lastPost && lastPost.id}&limit=10`);
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    }catch(err){
      console.error(err);
    }

  }, 2000),




};