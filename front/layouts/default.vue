<template>
  
  <v-app> 
    <v-row no-gutters v-if="me">
      <v-col cols="12" xs="12" md="2">
        <navigation-drawer />
        <floating-button />
      </v-col>
      <v-col cols="12" xs="12" md="10">
        <nuxt />
      </v-col>
    </v-row> 
    <div v-else-if="profile">

    </div>
    <div v-else>
      <login-form></login-form>
    </div>


  </v-app>
</template>

<script>
  import NavigationDrawer from '~/components/NavigationDrawer'
  import FloatingButton from '~/components/FloatingButton'
  import PostCard from '~/components/PostCard'
  import LoginForm from '~/components/LoginForm'
  export default {
    data() {
      return {
        profile: true,
      }
    },
    methods: {

    },
    watch: {
      $route (to, from){
        // 경로 변경되었을 때
        if(to.name === 'profile'){
          this.profile = false;
        }else{
          this.profile = true;
        }

      }
    },
    computed:{ 
      me(){
        return this.$store.state.users.me;
      }
    },
    components: {
      NavigationDrawer,
      PostCard,
      LoginForm,
      FloatingButton,
    }
  }
</script>

<style scoped>

</style>