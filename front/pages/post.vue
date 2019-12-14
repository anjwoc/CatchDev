<template>
  <v-app>
    <v-row class="fill-height white ma-0 pa-0 ml-1">
      <div id="mainContent"></div>
    </v-row>
  </v-app>
</template> 

<script>
  export default {
    props: {
      html: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
#mainContainer {
  background-color: white;
}
</style>