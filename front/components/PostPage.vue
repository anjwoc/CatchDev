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
        type: Object,
        required: true,
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      this.content = document.querySelector('#mainContent');
      this.content.innerHTML = this.html.content;
    },
  }
</script>

<style scoped>

</style>