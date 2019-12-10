export const state = () => ({
  me: null,
  AllPosts: [],
  ClosedPosts: [],
  OngoingPosts: [],

});
export const mutations = {
  setMe(state, payload){
    state.me = payload;
  },
  logOut(state){
    state.me = null;
  },
  loadPosts({ commit }, payload){
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    if(payload.offset === 0) {
      AllPosts = payload.data;
    }else{
      AllPosts.concat(payload.data);
    }
  },
  loadClosedPosts({ commit }, payload){
    //종료된 스터디만 불러옴

  },
  loadOngoingPosts({ commit }, payload){
    //진행중인 스터디만 불러옴

  }

};

export const actions = {
  signUp({ commit }, payload){
    this.$axios.post('/user', {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      about: payload.about,
    },{
      withCredentials: true,
    })
      .then((res)=>{
        commit('setMe', res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  logIn({ commit }, payload){
    this.$axios.post('/user/login', {
      email: payload.email,
      password: payload.password
    },{
      withCredentials: true,
    })
      .then((res)=>{
        commit('setMe', res.data);
      })
      .catch((err)=>{
        console.error(err);
      });
  },
  logOut({ commit }, payload){
    commit('logOut', payload);
  },
  loadPosts({ commit }, payload){
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    commit('loadPosts', payload);
  },
  loadClosedPosts({ commit }, payload){
    //종료된 스터디만 불러옴
    commit('loadClosedPosts', payload);
  },
  loadOngoingPosts({ commit }, payload){
    //진행중인 스터디만 불러옴
    commit('loadOngoingPosts', payload);
  }



};