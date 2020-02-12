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
    fetch({ store, params }) {
      const paramsData = params.id.split('&');
      const email = paramsData[0].split('=')[1];
      const socialType = paramsData[1].split('=')[1];
      store.dispatch('users/githubLogIn',{
        email: email,
        socialType: socialType,
      })
        .then(()=>{
          // this.$router.push({ path: '/' });
        })
        .catch((err)=>{
          console.error(err)  
        })
    },
    computed: {
      serviceName() {
        const fullPath = this.$route.path;
        const name = fullPath.split('/')[2];
        return name;
      },
      
    },
    methods: {
      redirect(url) {
        window.location.href = url;
      }
    },
    mounted(){
      

    },
  
  }
</script>

<style scoped>

</style>