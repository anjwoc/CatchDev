<template>
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
</template>

<script>
  export default {
    data() {
      return {
        fab: false,

      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('users/logOut');
      }
    }
  }
</script>

<style scoped>

</style>