<template>
  
  <v-app> 
    <v-row no-gutters v-if="me">
      <v-col cols="12" xs="12" md="2">
        <navigation-drawer />
        <v-speed-dial
          v-model="fab"
          fab
          fixed
          top
          right
          direction="bottom"
          transition="slide-y-transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="indigo"
            nuxt to="/profile"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="green"
            nuxt to="/post"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          
          <v-btn
            fab
            dark
            small
            color="red"
            @click="onLogout"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
      <v-col cols="12" xs="12" md="10">
        <nuxt />
      </v-col>
    </v-row> 
    <div v-else>
      <login-form></login-form>
    </div>


  </v-app>
</template>

<script>
  import NavigationDrawer from '~/components/NavigationDrawer';
  import PostCard from '~/components/PostCard'
  import LoginForm from '~/components/LoginForm'
  export default {
    data() {
      return {
        fab: false,

      }
    },
    methods: {
      onLogout() {

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
    }
  }
</script>

<style scoped>

</style>