<template>
  <v-form ref="form" id="commentSection" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
    <v-textarea
      id="mainComment"
      v-model="content"
      outlined
      auto-grow
      clearable
      label="댓글을 입력해주세요."
      class="ma-0 pa-0"
      prepend-inner-icon="comment"
      row="1"
      row-height="20"
      :hide-details="hideDetails"
    />
    <div id="commentSection" class="ma-0 pa-0 justify-end" align="end">
      <v-btn color="primary" type="submit" outlined>작성하기</v-btn>
    </div>
  </v-form>
</template>

<script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        valid: false,
        content: '',
        hideDetails: true,
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/addComment', {
            postId: this.postId,
            content: this.content,
          })
            .then(() => {
              this.content = '';
            })
        }
      },
    },
  };
</script>

<style>
  
  #mainComment {
    max-height: 300px;
  }
</style>
