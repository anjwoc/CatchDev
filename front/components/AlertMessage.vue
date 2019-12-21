<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      :type = "type()"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      {{ message }}
    </v-alert>
    

  </div>
</template>
<script>
export default {
  props: {
    alert: {
      type: Boolean,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      alertType: '',
    }
  },
  computed: {
    type() {
      return this.success === true ? 'success' : 'failure'
    }
  }

}
</script>
<style scoped>

</style>