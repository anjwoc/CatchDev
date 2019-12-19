<template>
  <v-app>
    <v-row id="test" class="fill-height white ma-0 pa-0">
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <div>{{html}}</div>
        <h1 id="mainTitle" style="font-size: 50px;">{{html.title}}</h1>
        <div id="mainContent">
          
        </div>
      </v-col>
      <v-col cols="12" md="2"></v-col>
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