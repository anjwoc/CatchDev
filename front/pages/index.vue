<template>
  <div>
    <div v-if="!me">
      <login-form></login-form>
    </div>
    <div v-if="me">
      로그인 된 상태
    </div>
    
    <v-container />
    <v-container />
    <v-container />
    <v-container class="ma-0 pa-0 ml-4">
      <h2>지금 뜨고 있는 포스트</h2>
    </v-container>
    <v-row>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6" xs="12" class="ma-0 pa-0">
        <v-container>
          <post-card />
        </v-container>
      </v-col>
    </v-row>
      
    
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
  export default {
    components: {
      PostCard,
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    }

  }
</script>

<style scoped>

</style>