<template>
  <div>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
      
      }
    },
    fetch({ store, params, redirect }) {
      const paramsData = params.id.split('&');
      const email = paramsData[0].split('=')[1];
      const socialType = paramsData[1].split('=')[1];
      store.dispatch('users/githubLogIn',{
        email: email,
        socialType: socialType,
      })
        .then((res)=>{
          return redirect(process.env.baseUrl);
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
    middleware: 'redirect',
  
  }
</script>

<style scoped>

</style>