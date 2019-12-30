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
  async loadUser({ state, commit }){
    try{
      const res = await this.$axios.get('/user', {
        withCredentials: true,
      });
      console.log("loadUser 진입");
      commit('setMe', res.data);
    }catch(err){
      console.error(err);
    };
  },
  async loadSpecificUser({ state, commit }, payload){
    try{
      const res = await this.$axios.get(`/user/${payload.id}`, {
        withCredentials: true,
      });
      console.log("loadSpecificUser 진입");
      commit('setMe', res.data);
    }catch(err){
      console.error(err);
    };
  },
  
  async signUp({ commit }, payload){
    return await this.$axios.post('/user', {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      about: payload.about,
    },{
      withCredentials: true,
    })
      .then((res)=>{
        // console.log(res.status);
        if(res.status === 200){
          commit('setMe', res.data);
          return res;
        }
      })
      .catch((err)=>{
        if(err.response && err.response.data){
          // console.log(err.response);
          // return을 해야 컴포넌트에서 에러 객체를 받을 수 있다.
          return err;
        }
      });
  },
  async logIn({ commit }, payload){
    await this.$axios.post('/user/login', {
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
  async logOut({ commit }, payload){
    await this.$axios.post('/user/logout', {}, {
      withCredentials: true,
    })
      .then(()=>{
        commit('setMe', null);
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  addAdditionalInfo({ commit }, payload){
    //프로필페이지에서 직무나 지역정보를 수정하고 
    //github, gmail, linkedIn의 정보를 표시
    this.$axios.post('/user/info', {
    },{
      withCredentials: true,
    })
      .then((res)=>{

      })
      .catch((err)=>{
        console.error(err);
      });
  },
  updateProfile({ commit, state }, payload){
    this.$axios.post(`/user/profileUpdate/${payload.userId}`, {
      userId: payload.userId,
      job: payload.job,
      location: payload.location,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        console.log("updateProfile response");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
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
  },
  



};