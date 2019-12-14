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
  

};