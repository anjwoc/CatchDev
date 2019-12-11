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
  concatImagePaths(state, payload){
    state.imagePaths = state.imagePaths.concat(payload);
  },
  updateImagePaths(state, payload){
    console.log(`updateImagePaths ${payload}`)
    state.newImagePath = payload;
  },
  removeImagePath(state, payload){
    state.imagePaths.splice(payload, 1);
  }
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
  async uploadImages({ commit }, payload){
    try{
      this.$axios.post('/board/images', payload , {
        withCredentials: true,
      })
        .then((res)=>{
          console.log(`posts/uploadImages 호출 ${res}`);
          console.log(res.data);
          commit('updateImagePaths', res.data);
        })
        .catch((err)=>{
          console.error(err);
        })

    }catch(err){
      console.error(err);
    }
    commit('concatImagePaths', payload);
    
  },


};