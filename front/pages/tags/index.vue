<template>
  <div id="app">
    <v-card
      class="mx-auto fill-height background"
      dark
      elevation="0"
    >
      <v-card-text>
        <h2 class="title mb-2">Choose Hashtags</h2>
        
        <v-chip-group
          v-model="tagIdx"
          active-class="cyan--text text--accent-2"
          column
        >
          <v-chip 
            v-for="(tag, index) in hashtags"
            :key="index"
            :to="`/tags/${tag}`"
            color="white"
            filter
            outlined
          >
          {{tag}}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
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
    middleware: 'authenticated',
  }
</script>

<style lang="scss" scoped>
.background{
  background-color: #38424B;
}
</style>