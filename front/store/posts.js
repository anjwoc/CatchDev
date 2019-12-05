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
  concatImagePaths(state, payload){
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload){
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  add({ commit, state }, payload){
    this.$axios.post('/post', {
      content: payload.content,
      image: state.imagePaths,
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
  uploadImages({ commit }, payload){
    commit('concatImagePaths', payload);
    // this.$axios.post('/post/images', payload, {
    //   withCredentials: true,
    // })
    //   .then((res)=>{
    //     commit('commitImagePaths', res.data);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
  }


};