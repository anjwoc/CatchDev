<template>
  <div>
  <h1 class="amber--text">{{this.serviceName}} login</h1>
  </div>
</template>

<script>
  export default {
  data() {
    return {
    
    }
  },
  computed: {
    serviceName() {
    const fullPath = this.$route.path;
    const name = fullPath.split('/')[2];
    return name;
    },
    onLogin() {
    this.$store.dispatch('users/logIn', {
      email: this.email,
      password: this.password
    })
      .then(()=>{
      this.$router.push({ path: '/' });
      })
      .catch((err)=>{
      console.error(err)
      })
    }
  },
  methods: {
    redirect(url) {
    window.location.href = url;
    }
  },
  async mounted(){
    const redirect = this.redirect;
    const reqUrl = `${process.env.baseUrl}/user/githubLogin?code=${this.$route.query.code}&state=${this.$route.query.state}`;
    await this.$axios.get(reqUrl)
    .then((res) => {
      // if(!res.data){
      // alert('something went wrong. can\'t get access token.');
      //   redirect('/');
      // }
      this.$axios.get(`user/githubUser?token=${res.data}&service=github`)
        .then((res) => {
          console.log(res.data);
        })
      
      // redirect(`/user/githubUser?token=${res.data}&service=github`);
    })
    // .catch((err) => {
    //   console.error(err);
    //   redirect('/');
    // })
  },
  beforeRouteEnter(to, from, next) {
    if(to.query) {
    if(to.query.code && to.query.state){
      next();
    }else{
      alert('there\'s no query data.');
      next('/');
    }
    }else{
    alert('there\'s no query data.');
    next('/');
    }
  }
  }
</script>

<style scoped>

</style>