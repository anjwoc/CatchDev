import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
  newImagePath: [],

});
export const mutations = {
  addMainPost(state, payload){
    state.mainPosts.unshift(payload);
  },
};

export const actions = {
  add({ commit, state }, payload){
    this.$axios.post('/board', {
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

};