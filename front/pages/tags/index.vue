<template>
  <div id="app">
    <v-app id="inspire">
      <v-card
        class="mx-auto"
        elevation="0"
      >
        <v-card-text>
          <div class="d-flex row">
            <h2 class="title mb-2">Choose Hashtags</h2>
          </div>
          
          <v-chip-group
            v-model="tagIdx"
            active-class="deep-purple--text text--accent-4"
            column
          >
            <v-chip 
              v-for="(tag, index) in hashtags"
              :key="index"
              :to="`/tags/${tag}`"
              color="deep-purple lighten-3"
              filter
              outlined
            >
            {{tag}}
            </v-chip>
            
          </v-chip-group>
        </v-card-text>
        
      </v-card>
    </v-app>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tagIdx: 0
      }
    },
    fetch({ store, params }){
      return store.dispatch('posts/loadAllHashtags');
    },
    computed: {
      hashtags() {
        return this.$store.state.posts.hashtags;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>