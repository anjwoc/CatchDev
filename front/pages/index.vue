<template>
  <div>
    <v-container />
    <v-container />
    <v-container />
    <v-container class="ma-0 pa-0 ml-4">
      <h2>지금 뜨고 있는 스터디</h2>
    </v-container>
    <v-row>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
    </v-row>
      
    
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import authenticated from '~/middleware/authenticated'
  export default {
    components: {
      PostCard,
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    watch: {
      me: function (newValue){
        if(!this.me){
          this.$router.push({ path: '/login' });
        }
      }
    },
  }
</script>

<style scoped>

</style>