<template>
  <v-speed-dial
    v-model="fab"
    fab
    fixed
    absolute
    bottom
    right
    direction="top"
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
      :to="profileUrl"
    >
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green"
      nuxt to="/write"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="black"
      nuxt to="/setting"
    >
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-btn
      v-if="!me"
      fab
      dark
      small
      color="primary"
      nuxt to="/login"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn
      v-if="me"
      fab
      dark
      small
      color="red"
      @click="onLogout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    
    
  </v-speed-dial>
</template>

<script>
  export default {
    data() {
      return {
        fab: false,
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      profileUrl() {
        if(this.me && this.me.id){
          return '/profile/' + this.me.id;
        }
        return '/profile/'
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('users/logOut')
          .then(()=>{
            this.$router.push({ path: '/login' });
          })
          .catch((err)=>{
            console.error(err)
            return next(err);
          });
      }
    }
  }
</script>

<style scoped>
* {
  z-index: 20;
}


</style>