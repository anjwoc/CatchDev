<template>
  
  <v-app>
    <v-row no-gutters>
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
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="green"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="indigo"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
      <v-col cols="12" xs="12" md="10">
        <nuxt />
        
      </v-col>
    </v-row> 
  </v-app>
</template>

<script>
  import NavigationDrawer from '~/components/NavigationDrawer';
  import PostCard from '~/components/PostCard'
  export default {
    data() {
      return {
        fab: false,

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
    }
  }
</script>

<style scoped>

</style>